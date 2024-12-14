// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Chat({ recipientId }) {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     useEffect(() => {
//         const fetchMessages = async () => {
//             const token = localStorage.getItem('token');
//             const response = await axios.get(
//                 `http://localhost:5000/messages?recipient=${recipientId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setMessages(response.data);
//         };

//         fetchMessages();
//     }, [recipientId]);

//     const handleSendMessage = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.post(
//                 'http://localhost:5000/messages',
//                 { recipientId, content: newMessage },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setMessages([...messages, { content: newMessage, sender: 'You' }]);
//             setNewMessage('');
//         } catch (error) {
//             alert('Failed to send message.');
//         }
//     };

//     return (
//         <div>
//             <h1>Chat</h1>
//             <div>
//                 {messages.map((msg, index) => (
//                     <p key={index}>
//                         <strong>{msg.sender}: </strong>
//                         {msg.content}
//                     </p>
//                 ))}
//             </div>
//             <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button onClick={handleSendMessage}>Send</button>
//         </div>
//     );
// }

// export default Chat;


////SEPARATE
// src/components/Messaging/Chat.js

// src/components/Messaging/Chat.js
import React, { useEffect, useState } from 'react';
import { auth, db, setDoc, doc, collection, getDocs, query, where } from '../../firebase'; // Ensure all necessary imports
import { Input, Button } from '../Auth/StyleAuthCard';
import MessageList from './MessageList'; // Import MessageList

function Chat({ recipientId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            const user = auth.currentUser; // Verify user authentication
            console.log("Current User:", user); // Log the current user

            if (!user) {
                alert('You must be logged in to view messages.');
                return; // Exit if the user is not authenticated
            }

            if (!recipientId) {
                console.error("Recipient ID is undefined.");
                return; // Exit if recipientId is not defined
            }

            try {
                // Create a query to fetch messages between the current user and the recipient
                const messagesRef = collection(db, 'messages');
                const messagesQuery = query(
                    messagesRef,
                    where('senderId', 'in', [user.uid, recipientId]),
                    where('recipientId', 'in', [user.uid, recipientId])
                );

                const messagesSnapshot = await getDocs(messagesQuery);
                const messagesList = messagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMessages(messagesList);
            } catch (error) {
                console.error("Error fetching messages:", error);
                alert('Failed to fetch messages.');
            }
        };

        fetchMessages();
    }, [recipientId]);

    const handleSendMessage = async () => {
        const senderId = auth.currentUser.uid;

        if (!recipientId) {
            console.error("Recipient ID is undefined.");
            alert('Cannot send message. Recipient ID is not defined.');
            return; // Exit if recipientId is not defined
        }

        const messageData = {
            senderId,
            recipientId,
            content: newMessage,
            timestamp: new Date().toISOString(),
        };

        try {
            await setDoc(doc(db, 'messages', `${Date.now()}`), messageData);
            setMessages([...messages, { ...messageData, sender: 'You' }]); // Add the new message to the state
            setNewMessage(''); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
            alert('Failed to send message.');
        }
    };

    return (
        <div>
            <h1>Chat</h1>
            <MessageList messages={messages} currentUserId={auth.currentUser.uid} /> {/* Pass messages to MessageList */}
            <Input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <Button onClick={handleSendMessage}>Send</Button>
        </div>
    );
}

export default Chat;
// import React from "react";

// const MessageList = ({ messages, currentUserId }) => {
//     return (
//         <div className="message-list">
//             {messages.map((message) => (
//                 <div
//                     key={message.id}
//                     className={`message ${message.senderId === currentUserId ? "sent" : "received"
//                         }`}
//                 >
//                     <p>{message.content}</p>
//                     <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default MessageList;


///SEPARATE

// src/components/Messaging/MessageList.js
import React from "react";
import Chat from "./Chat"; // Import Chat component

const MessageList = ({ messages, currentUserId, onSelectUser }) => {
    return (
        <div className="message-list">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`message ${message.senderId === currentUserId ? "sent" : "received"}`}
                    onClick={() => onSelectUser(message.senderId)} // Call the function to select user
                >
                    <p>{message.content}</p>
                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
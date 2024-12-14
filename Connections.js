// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Connections() {
//     const [connections, setConnections] = useState([]);
//     const [pendingRequests, setPendingRequests] = useState([]);

//     useEffect(() => {
//         const fetchConnections = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await axios.get('http://localhost:5000/connections', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setConnections(response.data.connections);
//                 setPendingRequests(response.data.pendingRequests);
//             } catch (error) {
//                 alert('Failed to fetch connections.');
//             }
//         };

//         fetchConnections();
//     }, []);

//     const handleAcceptRequest = async (requestId) => {
//         const token = localStorage.getItem('token');
//         try {
//             await axios.post(
//                 `http://localhost:5000/connections/accept`,
//                 { requestId },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             alert('Connection request accepted!');
//             window.location.reload();
//         } catch (error) {
//             alert('Failed to accept the connection request.');
//         }
//     };

//     return (
//         <div>
//             <h1>Connections</h1>
//             <h2>Pending Requests</h2>
//             {pendingRequests.length > 0 ? (
//                 pendingRequests.map((request) => (
//                     <div key={request.id}>
//                         <p>{request.name}</p>
//                         <button onClick={() => handleAcceptRequest(request.id)}>Accept</button>
//                     </div>
//                 ))
//             ) : (
//                 <p>No pending requests.</p>
//             )}
//             <h2>Your Connections</h2>
//             <ul>
//                 {connections.map((connection) => (
//                     <li key={connection.id}>{connection.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Connections;

///SEPARATE

// src/components/Connections/Connections.js
import React, { useEffect, useState } from 'react';
import { auth, db, setDoc, doc, getDocs, collection } from '../../firebase';
import { Button } from '../Auth/StyleAuthCard';

function Connections() {
    const [connections, setConnections] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        const fetchConnections = async () => {
            //TEST
            const user = auth.currentUser;
            console.log("Current User:", user);

            if (!user) {
                alert('You must be logged in to view connections.');
                return;
            }

            try {
                const userId = user.uid;
                const connectionsRef = collection(db, 'connections');
                const connectionsSnapshot = await getDocs(connectionsRef);
                const connectionsList = connectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                console.log("Connections List:", connectionsList); // Log the connections list

                setConnections(connectionsList.filter(conn => conn.recipientId === userId && conn.status === 'accepted'));
                setPendingRequests(connectionsList.filter(conn => conn.recipientId === userId && conn.status === 'pending'));
            } catch (error) {
                console.error("Error fetching connections:", error);
                alert('Failed to fetch connections. Check console for details.');
            }

            //ORIGINAL CODE
            // const userId = auth.currentUser.uid;
            // const connectionsRef = collection(db, 'connections');
            // const connectionsSnapshot = await getDocs(connectionsRef);
            // const connectionsList = connectionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // setConnections(connectionsList.filter(conn => conn.recipientId === userId && conn.status === 'accepted'));
            // setPendingRequests(connectionsList.filter(conn => conn.recipientId === userId && conn.status === 'pending'));
        };

        fetchConnections();
    }, []);

    const handleSendConnectionRequest = async (recipientId) => {
        const connectionData = {
            senderId: auth.currentUser.uid,
            recipientId,
            status: 'pending',
        };

        await setDoc(doc(db, 'connections', `${Date.now()}`), connectionData);
        alert('Connection request sent!');
    };

    const handleAcceptRequest = async (requestId) => {
        const connectionRef = doc(db, 'connections', requestId);
        await setDoc(connectionRef, { status: 'accepted' }, { merge: true });
        alert('Connection request accepted!');
        window.location.reload();
    };

    return (
        <div>
            <h1>Connections</h1>
            <h2>Pending Requests</h2>
            {pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                    <div key={request.id}>
                        <p>{request.senderId}</p>
                        <Button onClick={() => handleAcceptRequest(request.id)}>Accept</Button>
                    </div>
                ))
            ) : (
                <p>No pending requests.</p>
            )}
            <h2>Your Connections</h2>
            <ul>
                {connections.map((connection) => (
                    <li key={connection.id}>{connection.senderId}</li>
                ))}
            </ul>
        </div>
    );
}

export default Connections;
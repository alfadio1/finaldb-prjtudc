// src/components/Messaging/UserList.js
import React from 'react';

const UserList = ({ users, onSelectUser }) => {
    return (
        <div className="user-list">
            <h2>Select a User to Chat</h2>
            {users.map(user => (
                <div key={user.id} onClick={() => onSelectUser(user.id)} className="user-item">
                    {user.name}
                </div>
            ))}
        </div>
    );
};

export default UserList;
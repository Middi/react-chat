import React from 'react'

const Messages = ({ messages }) => (
    <div className="messages">
        {messages.map(message => {
            return (
                <div key={message.key}>{message.author}: {message.message}</div>
            )
        })}
    </div>
);

export default Messages;
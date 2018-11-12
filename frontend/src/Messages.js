import React from 'react'

const Messages = ({ messages }) => (
    <div className="messages">
        {messages.map(message => {
            return (
                <div key={message.message + message.author}>{message.author}: {message.message}</div>
            )
        })}
    </div>
);

export default Messages;
import React from 'react';
import './styles.css';

const MessageItem = ({username, chat, index}) => {
    return(
        <div
            key={index}
            className={`chat-message ${username === chat.username ? "my-chat-message" : ""}`}>
            <p className='message-sender' style={{color: username === chat.username ? 'white' : undefined}}>{chat.username}</p>
            {chat.content &&  <img className='message-image' src={chat.content} alt={chat.name} />  }
            {chat.message && <p className='message-text'>{chat.message}</p>}
            <span className='message-time' style={{color: username === chat.username ? 'white' : undefined}}>{chat.timestamp}</span>     
        </div>
    )
}

export default MessageItem
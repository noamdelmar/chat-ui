import React from 'react';
import './styles.css';

const MessageItem = ({username, chat, index}) => {
    return(
        <div
            key={index}
            className="chat-message"
            style={{ alignSelf: username === chat.username ? 'self-end' : undefined }}
        >
            {username !== chat.username && <p className='message-sender'>{chat.username}</p>}
            {chat.message ? 
            <p className='message-text'>{chat.message}</p>
             :
              <img className='message-image' src={chat.content} alt={chat.name} />
             }

            <span className='message-time'>{chat.timestamp}</span>
            {/* {chat.status === 'delivered' && <span style={{ marginLeft: '4px', color: 'orange' }}>✓</span>}
            {chat.status === 'read' && <span style={{ marginLeft: '4px', color: 'green' }}>✓✓</span>}  */}
        </div>
    )
}

export default MessageItem
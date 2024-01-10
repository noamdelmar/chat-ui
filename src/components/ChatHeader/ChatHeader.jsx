import React from 'react';
import './styles.css';
const ChatHeader = ({room}) => {
    return (
        <div className='header-container'>
            <h1 className='room-title'>{room}</h1>
        </div>
    )
}

export default ChatHeader
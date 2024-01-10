import React from 'react';
import './styles.css';
const ChatHeader = ({room, handleExitRoom}) => {
    return (
        <div className='header-container'>
            <h1 className='room-title'>{room}</h1>
            <div onClick={() => handleExitRoom(null)}>exit group</div>
        </div>
    )
}

export default ChatHeader
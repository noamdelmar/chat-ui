import React, { useState } from 'react';
import './styles.css';
import SpeechText from '../SpeechText/SpeechText';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const InputArea = ({socket, username, setChatLog}) => {
  const [message, setMessage] = useState('');

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const sendMessage = () => {   
        if (socket && message.trim() !== '') {
        const data = {
            type: 'message',
            username,
            message,
        };
        socket.send(JSON.stringify(data));
          const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
           const status = Math.random() < 0.5 ? 'delivered' : 'read';
        setChatLog((prevChatLog) => [...prevChatLog, { username, message, timestamp, status }]);
        setMessage('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' && message.trim() !== '') {
        sendMessage();
        }
    };

    return(
        <div className="input-container">
            <input
                className='input'
                type="text"
                // placeholder="Type your message..." 
                value={message}
                onChange={handleMessageChange}
                spellCheck={true}
                onKeyPress={handleKeyPress}
            />
            <IconButton color="primary" onClick={sendMessage}>
                <SendIcon />
            </IconButton>
            <SpeechText setMessage={setMessage} />
        </div>
    )
}

export default InputArea;
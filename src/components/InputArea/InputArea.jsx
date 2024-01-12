import React, { useState } from 'react';
import './styles.css';
import SpeechText from '../SpeechText/SpeechText';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';

const InputArea = ({ socket, username, setChatLog }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendMessage = () => {
    if (socket && (message.trim() !== '' || file)) {
      if (file) {
        // Handle file upload
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target.result.split(',')[1];
          const data = {
            type: 'file',
            username,
            file: {
              name: file.name,
              type: file.type,
              content: fileContent,
            },
          };
          socket.send(JSON.stringify(data));
        };
        reader.readAsDataURL(file);
      } else {
        // Handle text message
        const data = {
          type: 'message',
          username,
          message,
        };
        socket.send(JSON.stringify(data));
      }

      const timestamp = new Date().toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      const status = Math.random() < 0.5 ? 'delivered' : 'read';
      setChatLog((prevChatLog) => [
        ...prevChatLog,
        { username, message, timestamp, status, file },
      ]);
      setMessage('');
      setFile(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && (message.trim() !== '' || file)) {
      sendMessage();
    }
  };

  return (
    <div className="input-container">
      <input
        className="input"
        type="text"
        value={message}
        onChange={handleMessageChange}
        spellCheck={true}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      {/* <input type="file" onChange={handleFileChange} /> */}
      <IconButton onClick={sendMessage}>
        <SendIcon />
      </IconButton>
      <SpeechText setMessage={setMessage} />
    </div>
  );
};

export default InputArea;

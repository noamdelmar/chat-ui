import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import SpeechText from '../SpeechText/SpeechText';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const InputArea = ({ socket, username, setChatLog }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const sendMessage = () => {
    const timestamp = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    if (socket && (message.trim() !== '' || file)) {
      if (file) {
        // Handle file upload
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = {
            type: 'file',
            file: {
              username,
              name: file.name,
              mimeType: file.type,
              content: event.target.result,
            },
          };
          socket.send(JSON.stringify(data));

          setChatLog((prevChatLog) => [
            ...prevChatLog,
            {
              username,
              name: file.name,
              mimeType: file.type,
              content: event.target.result,
              timestamp,
            },
          ]);
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

        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { username, message, timestamp },
        ]);
      }

      setMessage('');
      setFile(null);
      resetFileInput();
    }
  };

  const resetFileInput = () => {
    // Reset the file input value using the ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && (message.trim() !== '' || file)) {
      sendMessage();
    }
  };

  return (
    <div className="input-container">
      <IconButton style={{ cursor: 'pointer' }}>
        <label htmlFor="fileInput" className="fileInputLabel">
          <div className="plusButton">
            <AddIcon />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            id="fileInput"
            onChange={handleFileChange}
          />
        </label>
      </IconButton>
      <input
        className="input"
        type="text"
        value={message}
        onChange={handleMessageChange}
        spellCheck={true}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
      />
      <IconButton onClick={sendMessage}>
        <SendIcon />
      </IconButton>
      <SpeechText setMessage={setMessage} />
    </div>
  );
};

export default InputArea;

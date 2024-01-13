import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import SpeechText from '../SpeechText/SpeechText';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const InputArea = ({ socket, username, setChatLog }) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const fileInputRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setImageSrc(imageUrl);
    }
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
              message: message,
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
              message: message,
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
    <>
    {file && 
      <div className='upload-image-container'>
      <IconButton style={{alignSelf: 'start'}} onClick={() => setFile(null)}>
        <CloseIcon />
      </IconButton>
        <img style={{maxHeight: '70%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', marginTop: '7%', marginRight: '5%'}} src={imageSrc} />
      </div>
      }
      <div className='input-container'>
      {!file &&
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
      }
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
    </>
  );
};

export default InputArea;

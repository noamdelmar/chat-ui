import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';
import SideChats from '../../components/SideChats/SideChats';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const location = useLocation();
  const { username, port, room, password } = location.state;

  const PORT = 8080;

  useEffect(() => {
    // Initialize WebSocket connection
    const ws = new WebSocket(`ws://localhost:${PORT}?room=${room}&password=${password}`);

    ws.onopen = () => {
      console.log('Connected to chat server');

      // Send the username to the server
      if (username.trim() !== '') {
        const data = {
          type: 'username',
          username,
        };
        ws.send(JSON.stringify(data));
      }

      // Set the WebSocket instance in the state
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages
      const dataString = event.data;

      // Extract the JSON content (remove the username prefix)
      const jsonDataString = dataString.substring(dataString.indexOf(':') + 1).trim();

      try {
        // Parse the JSON data
        const data = JSON.parse(jsonDataString);

        if (data.type === 'message') {
          setChatLog((prevChatLog) => [...prevChatLog, { username: data.username, message: data.message }]);
        }
        if (data.type === 'userlist') {
          setConnectedUsers(data.users);
        }
        // Add handling for other message types if needed
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    return () => {
      // Close WebSocket connection on component unmount
      if (ws) {
        ws.close();
      }
    };
  }, [username, room, password]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // Send the message to the server
    if (socket && message.trim() !== '') {
      const data = {
        type: 'message',
        username,
        message,
      };
      socket.send(JSON.stringify(data));
      setChatLog((prevChatLog) => [...prevChatLog, { username, message }]);
      setMessage('');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideChats connectedUsers={connectedUsers} />
      <div className="chat-container">
        <div className="chat-log">
          {chatLog.map((chat, index) => (
            <div
              key={index}
              className="chat-message"
              style={{ alignSelf: username === chat.username ? 'self-end' : undefined }}
            >
              {chat.username}: {chat.message}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input type="text" placeholder="Enter your username" value={username} />
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

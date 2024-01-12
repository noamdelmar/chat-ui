import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';
import SideChats from '../../components/SideChats/SideChats';
import InputArea from '../../components/InputArea/InputArea';
import MessageItem from '../../components/MessageItem/MessageItem';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
 
const Chat = () => {
  const location = useLocation();
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [room, setRoom] = useState(sessionStorage.getItem("currentRoom"))
  const { username, port, password } = location.state;
    
  const PORT = 8080;

  useEffect(() => {
    sessionStorage.setItem('currentRoom', room);
    setChatLog([]);
    // Initialize WebSocket connection
    const ws = new WebSocket(`ws://localhost:${PORT}`);

    ws.onopen = () => {
      console.log('Connected to chat server');

      // Send the username to the server
      if (username.trim() !== '') {
        const data = {
          type: 'user_data',
          username,
          room
        };
        ws.send(JSON.stringify(data));
      }

      // Set the WebSocket instance in the state
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onmessage = (event) => {
      const dataString = event.data;
      

      try {
        // Parse the JSON data
        const data = JSON.parse(dataString);

        if (data.type === 'message') {
          const timestamp = new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
           const status = Math.random() < 0.5 ? 'delivered' : 'read';
          setChatLog((prevChatLog) => [...prevChatLog,  { username: data.username, message: data.message, timestamp, status },]);
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


  return (
    <div style={{ display: 'flex', backgroundColor: '#ededed' }}>
      <SideChats connectedUsers={connectedUsers} setRoom={setRoom}/>
      <div className="chat-container">
      <ChatHeader room={room} setRoom={setRoom} handleExitRoom={setRoom} connectedUsers={connectedUsers} />
        <div className="chat-log">
          {chatLog.map((chat, index) => (
            <MessageItem username={username} chat={chat}/>
          ))}
        </div>
            <InputArea socket={socket} username={username} setChatLog={setChatLog}/>
      </div>
    </div>
  );
};

export default Chat;

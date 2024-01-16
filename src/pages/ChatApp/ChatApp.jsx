import React, { useState, useEffect } from 'react';
import './styles.css';
import { useLocation } from 'react-router-dom';
import SideChats from '../../components/SideChats/SideChats';
import InputArea from '../../components/InputArea/InputArea';
import MessageItem from '../../components/MessageItem/MessageItem';
import ChatHeader from '../../components/ChatHeader/ChatHeader';
import AudioItem from '../../components/AudioItem/AudioItem';
import { useUserRooms } from '../../context/rooms/user_rooms_context';

const Chat = () => {
  const location = useLocation();
  const [chatLog, setChatLog] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [room, setRoom] = useState(sessionStorage.getItem("currentRoom"))
  const { userRooms } = useUserRooms();
  const { username, port } = location.state;
    

  useEffect(() => {
    sessionStorage.setItem('currentRoom', room);
    setChatLog([]);
    // Initialize WebSocket connection
    const ws = new WebSocket(`ws://localhost:${port}`);

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
      if(dataString.includes('Connected users')){

        const endIndex = dataString.indexOf("Connected users");
        
        // If "Connected users" is found
        if (endIndex !== -1) {
          // Extract the substring before the index of "Connected users"
          const usersPart = dataString.slice(0, endIndex).trim();
          
          // Remove the square brackets and split by commas to get an array
          const usersArray = usersPart.replace(/[\[\]']/g, '').split(',').map(item => item.trim());
          
          setConnectedUsers(usersArray);
        } 
      }

      try {
        // Parse the JSON data
        const data = JSON.parse(dataString);
        
        const timestamp = new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        if (data.type === 'message') {
           const status = Math.random() < 0.5 ? 'delivered' : 'read';
          setChatLog((prevChatLog) => [...prevChatLog,  {username: data.username, message: data.message, timestamp, status },]);
        } else if (data.type === 'userlist') {
          setConnectedUsers(data.users);
        } else if(data.type === 'file') { 
          setChatLog((prevChatLog) => [...prevChatLog, {username: data.file.username, name: data.file.name, content: data.file.content,message: data.file.message, timestamp}]);
        } else if(data.type === 'audio') {
          setChatLog((prevChatLog) => [...prevChatLog, {type: 'audio', username: data.audio.username, content: data.audio.content, timestamp}]);
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

  }, [username, room]);

  useEffect(() => {
    
    if(!room || !userRooms.includes(room)) setRoom('General Group');
    sessionStorage.setItem('currentRoom', room)
  },[room, userRooms])

  return (
    <div style={{ display: 'flex', backgroundColor: '#efefef' }}>
      <SideChats connectedUsers={connectedUsers} setRoom={setRoom}/>
      <div className="chat-container">
      <ChatHeader room={room} setRoom={setRoom} handleExitRoom={setRoom} connectedUsers={connectedUsers} />
      <div className="chat-log">
        {chatLog.map((chat, index) => (
          chat.type === 'audio' ? 
            <AudioItem audio={chat} username={username} key={index} />
          :
            <MessageItem username={username} chat={chat} key={index} />
        ))}
      </div>
      <InputArea socket={socket} username={username} setChatLog={setChatLog}/>
      </div>
    </div>
  );
};

export default Chat;

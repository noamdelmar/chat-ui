import React, { useState } from 'react';
import './styles.css';
import BasicInput from '../../components/BasicInput/BasicInput';
import { useNavigate } from 'react-router-dom';
import {useUserRooms} from '../../context/rooms/user_rooms_context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [port, setPort] = useState(5050);
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');
  const {userRooms, setUserRooms} = useUserRooms();
  const navigate = useNavigate();

  const handleConnect = () => {
    // Navigate to the chat page with the provided information
    if(!userRooms.includes('General Group')){
      setUserRooms((prevArray) => ['General Group', ...prevArray ]) 
    }
    sessionStorage.setItem('currentRoom', 'General Group');
      navigate('/chat', {
      state: { username, port },
    });
  };


  return (
    <div className='container'>
      <div className='login-side'>
        <h1>Welcome back!</h1>
      </div>
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>
        <BasicInput name='Username' setValue={setUsername} />
        <BasicInput name='Port' value={port} setValue={setPort} />
        {/* <BasicInput name='Room' setValue={setRoom} />
        <BasicInput name='Password' type='password' setValue={setPassword} /> */}
        <button className='login-button' disabled={!username} onClick={handleConnect}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default Login;

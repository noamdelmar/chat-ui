import React, { useState } from 'react';
import './styles.css';
import BasicInput from '../../components/BasicInput/BasicInput';
import { useNavigate } from 'react-router-dom';
import {useUserRooms} from '../../context/rooms/user_rooms_context';

const Login = () => {
  const [username, setUsername] = useState('');
  const [port, setPort] = useState();
  const {userRooms, setUserRooms} = useUserRooms();
  const navigate = useNavigate();

  const handleConnect = () => {
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
      <div className='login-container'>
        <h1 className='login-title'>Login</h1>
        <BasicInput name='Username' setValue={setUsername} />
        <BasicInput name='Port' value={port} setValue={setPort} />
        <button className='login-button' disabled={!username} onClick={handleConnect}>
          Connect
        </button>
      </div>
    </div>
  );
};

export default Login;

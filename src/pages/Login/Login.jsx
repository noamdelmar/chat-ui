import React, {useEffect, useState} from 'react';
import './styles.css';
import BasicInput from '../../components/BasicInput/BasicInput';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [port, setPort] = useState('');
    const navigate = useNavigate();

    return(
        <div className='container'>
            <div className='login-side'>
                <h1>Welcome back!</h1>
            </div>
            <div className='login-container'>
                <h1 className='login-title'>Login</h1>
                <BasicInput name='Username' setValue={setUsername} />
                <BasicInput name='Port' value={5050} setValue={setPort} />
                <button className='login-button' disabled = {!username} onClick={() => navigate('/chat', { state: { username, port } })}>connect</button>
            </div>
        </div>
    )
}

export default Login;
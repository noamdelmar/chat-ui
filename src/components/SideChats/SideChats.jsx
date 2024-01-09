import React, { useEffect } from 'react';
import './styles.css';
import httpCommon from '../../services/httpCommon';

const SideChats = () => {
    const getConnectedUsers = async () => {
        const res = await httpCommon.get('/get_usernames')
        console.log(res);
    }

    useEffect(() => {
        // getConnectedUsers()
    }, [])
    return(
        <div className='side-container'></div>
    )
}

export default SideChats;
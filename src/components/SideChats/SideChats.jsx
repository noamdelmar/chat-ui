import React, { useEffect } from 'react';
import './styles.css';
import httpCommon from '../../services/httpCommon';

const SideChats = () => {
    const getConnectedUsers = async () => {
        try {
            console.log('get all users');
            const res = await httpCommon.get('/get_usernames');
            console.log(res.data);  // Assuming your data is in the 'data' property of the response
        } catch (error) {
            console.error('Error fetching connected users:', error);
        }
    };

    useEffect(() => {
        // getConnectedUsers();
    }, []);
    
    return(
        <div className='side-container'></div>
    )
}

export default SideChats;
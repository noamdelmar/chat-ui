import React, { useEffect } from 'react';
import './styles.css';
import httpCommon from '../../services/httpCommon';
import { useAppContext } from '../../context/popup/popup_context_provider';
import CreateRoomPopup from '../popup/CreateRoomPopup';

const SideChats = ({setRoom}) => {
    const { showPopup, hidePopup } = useAppContext();
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
        <div className='side-container'>
            <div onClick={() => showPopup(<CreateRoomPopup setRoom={setRoom} />)}>create a group</div>
            <div>join a group</div>
        </div>
    )
}

export default SideChats;
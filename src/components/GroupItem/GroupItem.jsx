import React from 'react';
import './styles.css';
import { useUserRooms } from '../../context/rooms/user_rooms_context';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const GroupItem = ({group, setRoom, id}) => {
    const currentRoom = sessionStorage.getItem('currentRoom');
    const { userRooms, deleteRoom } = useUserRooms();
    
    const handleDelete = () => {
        deleteRoom(group);
        if(userRooms === group) setRoom(userRooms[0])
    }
    return(
        <div style={{backgroundColor: currentRoom === group ? '#f2fbff' : undefined}} className='group-item-container' onClick={() => setRoom(group)}>
            <h1 className='group-item-title'>{group}</h1>
            { id !== 0 && 
            <IconButton onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
            }
        </div>
    )
}

export default GroupItem;
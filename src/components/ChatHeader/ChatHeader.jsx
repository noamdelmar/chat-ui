import React, { useState } from 'react';
import './styles.css';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RenameRoomPopup from '../popup/RenameRoomPopup';
import { useAppContext } from '../../context/popup/popup_context_provider';

const ChatHeader = ({room, setRoom, handleExitRoom, connectedUsers}) => {
    const { showPopup } = useAppContext();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className='header-container'>
        <div style={{display: 'flex', flexDirection: 'column', marginLeft: '20px', gap: '5px'}}>
            <h1 className='room-title'>{room}</h1>
            <p style={{margin: '0', fontSize: '13px', color: 'gray'}}>{connectedUsers.length} Online Members</p>
        </div>
        {room !== 'General Group' &&
        <>
            <IconButton
                size="large"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleExitRoom(null)}>Exit Group</MenuItem>
                {/* <MenuItem onClick={handleClose}>Pin Group</MenuItem> */}
                <MenuItem onClick={() => showPopup(<RenameRoomPopup room={room} setRoom={setRoom} />) }>Edit Group Name</MenuItem>
            </Menu>
        </>
        }
        </div>
    )
}

export default ChatHeader
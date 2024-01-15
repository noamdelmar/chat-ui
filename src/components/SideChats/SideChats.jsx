import React, { useEffect, useState } from 'react';
import './styles.css';
import { useAppContext } from '../../context/popup/popup_context_provider';
import CreateRoomPopup from '../popup/CreateRoomPopup';
import { useUserRooms } from '../../context/rooms/user_rooms_context';
import GroupItem from '../GroupItem/GroupItem';
import SearchAppBar from '../Search/Search';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

const iconStyle = {width: '45px', height: '45px', backgroundColor: '#01abef', margin: '5px' ,marginBottom: '10px', color: 'white'}
const SideChats = ({setRoom}) => {
    const { showPopup } = useAppContext();
    const { userRooms, setUserRooms } = useUserRooms();
    const [filterdRooms, setFilteredRooms] = useState(userRooms);
    
    useEffect(() => {
        if(filterdRooms.length === 0) setFilteredRooms(userRooms)
    },[filterdRooms])

    const handleCreateRoom = (newRoom) => {
      setUserRooms((prevArray) => [...prevArray, newRoom]);
      sessionStorage.setItem('currentRoom', newRoom)
      setRoom(newRoom);
    }

    return(
        <div className='side-container'>
            <IconButton style={iconStyle} onClick={() => showPopup(<CreateRoomPopup handleSubmit={handleCreateRoom} title='Create New Group' />)}>
                <AddIcon />
            </IconButton>
            <SearchAppBar data={userRooms} setFilteredData={setFilteredRooms} />
            {filterdRooms?.map((room, id) => {
                return <GroupItem group={room} setRoom={setRoom} id={id} />
            })}
        </div>
    )
}

export default SideChats;
import React, { useEffect, useState } from 'react';
import './styles.css';
import httpCommon from '../../services/httpCommon';
import { useAppContext } from '../../context/popup/popup_context_provider';
import CreateRoomPopup from '../popup/CreateRoomPopup';
import { useUserRooms } from '../../context/rooms/user_rooms_context';
import GroupItem from '../GroupItem/GroupItem';
import SearchAppBar from '../Search/Search';

const SideChats = ({setRoom}) => {
    const { showPopup } = useAppContext();
    const { userRooms } = useUserRooms();
    const [filterdRooms, setFilteredRooms] = useState(userRooms);
    
    useEffect(() => {
        if(filterdRooms.length === 0) setFilteredRooms(userRooms)
    },[filterdRooms])
    return(
        <div className='side-container'>
            <div onClick={() => showPopup(<CreateRoomPopup setRoom={setRoom} />)}>create a group</div>
            {/* <div>join a group</div> */}
            <SearchAppBar data={userRooms} setFilteredData={setFilteredRooms} />
            {filterdRooms?.map((room, id) => {
                return <GroupItem group={room} setRoom={setRoom} id={id} />
            })}
        </div>
    )
}

export default SideChats;
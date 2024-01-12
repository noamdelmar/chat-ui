import React, { useState, useEffect } from 'react';
import BasicInput from '../BasicInput/BasicInput';
import { useAppContext } from '../../context/popup/popup_context_provider';
import { useUserRooms } from '../../context/rooms/user_rooms_context';

const CreateRoomPopup = ({ room, setRoom }) => {
  const { hidePopup } = useAppContext();
  const [newRoom, setNewRoom] = useState();
  const { renameRoom } = useUserRooms();

  const handleSubmit = () => {
    renameRoom(room, newRoom);
    sessionStorage.setItem('currentRoom', newRoom)
    setRoom(newRoom);
    hidePopup()
  }
    return (
        <>
           <div>Create a new group</div>
            <BasicInput name='Room' setValue={setNewRoom} />
            <div onClick={() => handleSubmit()}>create</div>
        </>
    )
}
export default CreateRoomPopup
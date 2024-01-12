import React, { useState, useEffect } from 'react';
import BasicInput from '../BasicInput/BasicInput';
import { useAppContext } from '../../context/popup/popup_context_provider';
import { useUserRooms } from '../../context/rooms/user_rooms_context';

const CreateRoomPopup = ({setRoom}) => {
  const { hidePopup } = useAppContext();
  const [password, setPassword] = useState('');
  const [newRoom, setNewRoom] = useState();
  const { userRooms, setUserRooms } = useUserRooms();
  const [roomExists, setRoomExist] = useState(false);

  const handleSubmit = () => {
    if(!userRooms.includes(newRoom)){
      setUserRooms((prevArray) => [...prevArray, newRoom]);
      sessionStorage.setItem('currentRoom', newRoom)
      setRoom(newRoom);
      hidePopup()
    } else {
      setRoomExist(true);
    }
  }
    return (
        <>
           <div>Create a new group</div>
            <BasicInput name='Group' setValue={setNewRoom} />
            {roomExists && <div>The room already exist</div>}
            <BasicInput name='Password' type='password' setValue={setPassword} />
            <div onClick={() => handleSubmit()}>create</div>
        </>
    )
}
export default CreateRoomPopup
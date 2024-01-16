import React, { useState } from 'react';
import BasicInput from '../BasicInput/BasicInput';
import { useAppContext } from '../../context/popup/popup_context_provider';
import { useUserRooms } from '../../context/rooms/user_rooms_context';
import './styles.css';

const CreateRoomPopup = ({handleSubmit, title, type='Create'}) => {
  const { hidePopup } = useAppContext();
  const [newRoom, setNewRoom] = useState();
  const { userRooms } = useUserRooms();
  const [roomExists, setRoomExist] = useState(false);

  const submit = () => {
    if(!userRooms.includes(newRoom) && newRoom){
      handleSubmit(newRoom)
      hidePopup()
    } else {
      setRoomExist(true);
    }
  }
  
    return (
        <>
           <h1 className='create-group-title'>{title}</h1>
            <BasicInput name='Group' setValue={setNewRoom} />
            {roomExists && <div>The room already exist</div>}
            <div className='create-group-btn' onClick={() => submit()}>{type}</div>
        </>
    )
}
export default CreateRoomPopup
import React, { useState, useEffect } from 'react';
import BasicInput from '../BasicInput/BasicInput';

const CreateRoomPopup = () => {
  const [room, setRoom] = useState('');
  const [password, setPassword] = useState('');

    return (
        <>
           <div>Create a new group</div>
            <BasicInput name='Room' setValue={setRoom} />
            <BasicInput name='Password' type='password' setValue={setPassword} />
        </>
    )
}
export default CreateRoomPopup
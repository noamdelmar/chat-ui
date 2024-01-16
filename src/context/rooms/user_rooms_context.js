import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const UserRoomsContext = createContext();

// Create a provider component
export const UserRoomsProvider = ({ children }) => {
  const [userRooms, setUserRooms] = useState([]);

  // Example: Load user rooms from localStorage on component mount
  useEffect(() => {
    const storedUserRooms = JSON.parse(localStorage.getItem('userRooms')) || [];
    setUserRooms(storedUserRooms);
  }, []);

  // Example: Save user rooms to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userRooms', JSON.stringify(userRooms));
  }, [userRooms]);

  // Add any other functions or state you need
  const deleteRoom = (roomName) => {
    setUserRooms((prevUserRooms) => prevUserRooms.filter((room) => room !== roomName));
  };

  const renameRoom = (oldRoomName, newRoomName) => {
    setUserRooms((prevUserRooms) =>
      prevUserRooms.map((room) => (room === oldRoomName ? newRoomName : room))
    );
  };

  return (
    <UserRoomsContext.Provider value={{ userRooms, setUserRooms, deleteRoom, renameRoom }}>
      {children}
    </UserRoomsContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUserRooms = () => {
  const context = useContext(UserRoomsContext);
  if (!context) {
    throw new Error('useUserRooms must be used within a UserRoomsProvider');
  }
  return context;
};

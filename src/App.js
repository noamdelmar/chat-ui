import './App.css';
import ChatApp from './pages/ChatApp/ChatApp';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import PopupContainer from './context/popup/popup_container';
import ContextPopupProvider from './context/popup/popup_context_provider';
import {UserRoomsProvider} from './context/rooms/user_rooms_context';
function App() {
  return (
    <ContextPopupProvider>
      <UserRoomsProvider>
        <PopupContainer />
          <Routes>
            <Route index element={<Login />} />
            <Route path='/chat' element={<ChatApp />} /> 
          </Routes>
        </UserRoomsProvider>
    </ContextPopupProvider>
  );
}

export default App;

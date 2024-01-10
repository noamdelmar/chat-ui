import './App.css';
import ChatApp from './pages/ChatApp/ChatApp';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';
import PopupContainer from './context/popup/popup_container';
import ContextPopupProvider from './context/popup/popup_context_provider';

function App() {
  return (
    <ContextPopupProvider>
      <PopupContainer />
        <Routes>
          <Route index element={<Login />} />
          <Route path='/chat' element={<ChatApp />} /> 
        </Routes>
    </ContextPopupProvider>
  );
}

export default App;

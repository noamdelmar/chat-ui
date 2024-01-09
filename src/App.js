import './App.css';
import ChatApp from './pages/ChatApp/ChatApp';
import Login from './pages/Login/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path='/chat' element={<ChatApp />} /> 
    </Routes>
  );
}

export default App;

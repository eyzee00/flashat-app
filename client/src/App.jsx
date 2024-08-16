import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';

function App() {

  return (
    <><Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
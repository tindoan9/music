import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './pages/user/Sidebar';
import Profile from './pages/user/auth/Profile/Profile';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sidebar/>}/>
          <Route path='/trends' element={<Sidebar/>}/>
          <Route path='/albums' element={<Sidebar/>}/>
          <Route path='/login' element={<Sidebar/>}/>
          <Route path='/register' element={<Sidebar/>}/>
          <Route path='/mymusic/song' element={<Profile/>}/>
          <Route path='/mymusic/uploaded' element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

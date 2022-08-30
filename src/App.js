import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from './pages/user/Sidebar';
import Profile from './pages/user/auth/Profile/Profile';
import HeaderAdmin from './pages/dashboard/HeaderAdmin';
import Audio from './components/Audio/Audio';
import EditSong from './pages/dashboard/EditSong/EditSong';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Sidebar/>}/>
          <Route path='/trends' element={<Sidebar/>}/>
          <Route path='/login' element={<Sidebar/>}/>
          <Route path='/register' element={<Sidebar/>}/>
          <Route path='/mymusic/song' element={<Profile/>}/>
          <Route path='/dashboard/home' element={<HeaderAdmin/>}/>
          <Route path='/dashboard/postsong' element={<HeaderAdmin/>}/>
          <Route path='/dashboard/editsong' element={<HeaderAdmin/>}/>
          <Route path='/dashboard/songrating' element={<HeaderAdmin/>}/>
          <Route path='/dashboard/editsong:id' element={<EditSong/>}/>
        </Routes>
        <Audio/>
      </BrowserRouter>
    </>
  );
}

export default App;

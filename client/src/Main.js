import './style.css';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Popular from './Components/Home/Popular';
import Channels from './Components/channels/Channels';
import Likes from './Components/Likes/Likes';
import { Routes, Route } from 'react-router-dom';
import Watch from './Components/Watch/Watch';
import Search from './Components/Searchedvideo/Search';
import Profile from './Components/Profile/Profile';
// import Notification from './Components/Notification/Notification';
import Social from './Components/Social/Social';

const Main = () => {

  console.log(localStorage.getItem('access_token'));
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/mysubscriptions" element={<Home/>} />
        <Route path="/popularvideos" element={<Popular/>} />
        <Route path="/mychannels" element={<Channels/>} />
        <Route path="/mylikes" element={<Likes/>} />
        <Route path="/profile" element={<Profile/>} />
        {/* <Route path="/profile/social/:id" element={<Social/>} /> */}
        <Route path="/profile/edit-user/:id" element={<Profile/>} />
        {/* <Route path="/notifications" element={<Notification/>} /> */}
        <Route path='/mysubscriptions/:id' element={<Watch/>} />
        <Route path='/popularvideos/:id' element={<Watch/>} />
        <Route path='/mychannels/:id' element={<Home/>} />
        <Route path='/mychannels/:channelId/:id' element={<Watch/>} />
        <Route path='/searchedvideo' element={<Search/>} />
        <Route path='/searchedvideo/:id' element={<Watch/>} />
        <Route path='/profile/social/:id'/>
        <Route path='*' element={<Login/>}  replace/>
      </Routes>
    </div>
  );
}

export default Main

// <Home/>


import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile'; 
import * as authService from './services/authService';
import MatchResult from './components/MatchResult/MatchResult';
import History from './components/MatchHistory/MatchHistory';
import Game from './components/Game/Game';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());

  function handleLogout() {
    authService.logout();
    setUser(null);
    navigate('/');
  }

  function handleSignupOrLogin() {
    console.log("AUTH SERVICE: ", authService.getUser)
    setUser(authService.getUser);
    console.log("handleSignupOrLogin called");
  }

  return (
    <>
      {/* NavBar component, passing user and handleLogout as props */}
      {/* <NavBar user={user} handleLogout={handleLogout} handleSignupOrLogin={handleSignupOrLogin} /> */}
      {/* Routes definition for navigation */}
      <Routes>
        <Route path="/" element={<Profile user={user} />} />
          <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/game" element={<Game />} />
          <Route path="/matchresult" element={<MatchResult />} />
          <Route path="/history" element={<History />} />
      </Routes>
    </>
  );
};

export default App;





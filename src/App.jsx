

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile'; 
import * as authService from './services/authService';
import MatchResult from './components/MatchResult/MatchResult';
import History from './components/MatchHistory/MatchHistory';
import Game from './components/Game/Game';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

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
        <Route path="/" element={<Game />} />
          <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/profile" element={<ProtectedRoute user={user}> <Profile /> </ProtectedRoute>} />
          <Route path="/game" element={   <ProtectedRoute user={user}> <Game /> </ProtectedRoute>} />
          <Route path="/game/result/:resultId" element={ <ProtectedRoute user={user}> <MatchResult /> </ProtectedRoute>} />
          <Route path="/history" element={ <ProtectedRoute user={user}> <History /> </ProtectedRoute> } />
          <Route path="/profile" element={ <ProtectedRoute user={user}> <Profile /> </ProtectedRoute> } /> 
        <Route 
          path="/history" 
          element={
            <ProtectedRoute user={user}>
              <History />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
};

export default App;





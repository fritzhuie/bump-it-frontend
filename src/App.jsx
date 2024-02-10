

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile'; 
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import * as authService from './services/authService';

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());

  function handleLogout() {
    authService.logout();
    setUser(null);
    navigate('/');
  }

  function handleSignupOrLogin() {
    setUser(authService.getUser);
    console.log("handleSignupOrLogin called");
  }
  

  // useEffect hook to navigate to the sign-up page upon component mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) {
      // If the user is already logged in, navigate to the quiz page
      navigate('/profile')
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // Add user as a dependency to trigger the effect when user state changes

  return (
    <>

      {/* NavBar component, passing user and handleLogout as props */}
      {/* <NavBar user={user} handleLogout={handleLogout} handleSignupOrLogin={handleSignupOrLogin} /> */}
      {/* Routes definition for navigation */}
      <Routes>
        <Route path="/" element={<Profile user={user} />} />
        {user ? 
          // If user is logged in, don't render the login route
          <>
            <Route path="/login" element={<Navigate to="/" />} />
          </>
         : 
          <>
          {/* If user is not logged in, render the login route*/}
          <Route path="/login" element={<Login handleSignupOrLogin={handleSignupOrLogin} />} />
          <Route path="/signup" element={<Signup handleSignupOrLogin={handleSignupOrLogin} />} />
          </>
        }
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              {/* Profile component wrapped in ProtectedRoute to ensure it's accessible only to authenticated users */}
              <Profile handleLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;





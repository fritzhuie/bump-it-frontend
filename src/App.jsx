

import { Routes, Route } from 'react-router-dom';

import Profile from './pages/Profile/Profile'; 
import History from './pages/History/History';
import Game from './pages/Game/Game';
import MatchResult from './pages/MatchResult/MatchResult';

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/history" element={<History />}/>
        <Route path="/game" element={<Game />}/>
        <Route path="/matchresult" element={<MatchResult />}/>
      </Routes>
    </>
  );
};

export default App;





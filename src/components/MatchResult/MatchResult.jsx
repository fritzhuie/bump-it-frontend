import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Get an ID for the match it is set to display 
const MatchResult = ({ fromGame }) => { // Add a prop to indicate if this is from a game session
  const [matchResult, setMatchResult] = useState({});
  const [userProfiles, setUserProfiles] = useState({ player1: {}, player2: {} });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch match result
    gameServices.getMatchResult()
      .then(result => {
        setMatchResult(result); // Match result state
        matchResultServices.logMatchResult(result);
        
        // Fetch profiles for both users
        return Promise.all([
          profileServices.fetchProfile(result.player1Id),
          profileServices.fetchProfile(result.player2Id)
        ]);
      })
      .then(([player1Profile, player2Profile]) => {
        // Set profile state for both users
        setUserProfiles({ player1: player1Profile, player2: player2Profile });
      })
      .catch(error => {
        console.error('Failed to fetch data', error);
      });
  }, []);

  const handlePlayAgain = () => {
    navigate('/game');
  };

  const handleGoToHistory = () => {
    navigate('/history');
  };

  return (
    <div>
      <div className="match-result-header">
        <button className="close-button" onClick={handleGoToHistory}>
          <CloseIcon /> {/* Render the "X" icon */}
        </button>
        <h1>Match Result</h1>
      </div>
      <div className="user-result">
        <h2>{userProfiles.player1.name} (Player 1)</h2>
        <p>Choice: {matchResult.player1Choice}</p>
        <p>{matchResult.outcome.includes('Player 1 wins') ? 'Winner' : 'Loser'}</p>
      </div>
      <div className="user-result">
        <h2>{userProfiles.player2.name} (Player 2)</h2>
        <p>Choice: {matchResult.player2Choice}</p>
        <p>{matchResult.outcome.includes('Player 2 wins') ? 'Winner' : 'Loser'}</p>
      </div>
      <button onClick={handlePlayAgain}>Play Again</button>
      {fromGame && <button onClick={handlePlayAgain}>Next</button>} {/* Conditionally render the "Next" button */}
      <button onClick={handleGoToHistory}>View Match History</button>
    </div>
  );
};

export default MatchResult;

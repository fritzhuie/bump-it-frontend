import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMatchResult } from '../../services/matchResultServices'
import { getProfile } from '../../services/profileServices';

//Get an ID for the match it is set to display 
const MatchResult = ({ fromGame }) => { // Add a prop to indicate if this is from a game session
  const [matchResult, setMatchResult] = useState({})
  const [profiles, setProfiles] = useState({})
  const [userProfiles, setUserProfiles] = useState({ player1: {}, player2: {} })
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch match result
    getMatchResult()
      .then(results => {
        const match = results[results.length - 1]
        console.log(results[results.length - 1])
        setUserProfiles({ player1: match.player_one, player2: match.player_two })
        setMatchResult(match)
        return Promise.all([
          getProfile(match.player_one),
          getProfile(match.player_two)
        ])
      })
      .then( profiles => {
        console.log(profiles)
        setProfiles(profiles)
      })
      .catch(error => {
        console.error('Failed to fetch data', error);
      })
  }, [])

  const handlePlayAgain = () => {
    navigate('/game');
  }

  const handleGoToHistory = () => {
    navigate('/history');
  }

  return (
    <div>
      <div className="match-result-header">
        <button className="close-button" onClick={handleGoToHistory}>
          X
        </button>
        <h1>Match Result</h1>
      </div>
      <div className="user-result">
        <h2>{userProfiles.player1.name} (Player 1)</h2>
        <p>Choice: {matchResult.userchoice_1}</p>
        {/* <p>{matchResult.result.includes('Player 1 wins') ? 'Winner' : 'Loser'}</p> */}
      </div>
      <div className="user-result">
        <h2>{userProfiles.player2.name} (Player 2)</h2>
        <p>Choice: {matchResult.userchoice_2}</p>
        {/* <p>{matchResult.outcome.includes('Player 2 wins') ? 'Winner' : 'Loser'}</p> */}
      </div>
      <button onClick={handlePlayAgain}>Play Again</button>
      {fromGame && <button onClick={handlePlayAgain}>Next</button>} {/* Conditionally render the "Next" button */}
      <button onClick={handleGoToHistory}>View Match History</button>
    </div>
  );
};

export default MatchResult;

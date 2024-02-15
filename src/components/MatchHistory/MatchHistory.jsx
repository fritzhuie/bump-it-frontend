import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMatchHistory } from '../../services/matchHistoryServices'
import { getProfile } from '../../services/profileServices'

const History = () => {
  const [matchHistory, setMatchHistory] = useState([]);
  const [profiles, setProfiles] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getMatchHistory()
      .then(history => {
        console.log(history)
        setMatchHistory(history);
        for(let match of history) {

        }
      })
      .catch(error => {
        console.error('Failed to fetch match history:', error)
      })
  }, []);

  const handleGoToHistory = () => {
    navigate(-1); 
  };
  

  const handleMatchClick = (resultId) => {
    navigate(`/game/result/${resultId}`);
  };

  return (
    <div>
      <div className="match-result-header">
        <button className="close-button" onClick={handleGoToHistory}>
          X
        </button>
        <h1>Match Result</h1>
      </div>
      <ul className='match-container'>
        {matchHistory.map((match) => (
          <li key={match.id} className='match-row-item' onClick={() => handleMatchClick(match.id)}>
            <div className='user-avatar'>
              <img src={`/img/portrait-${match.player_one % 17}.png`} alt="User Avatar" />
            </div>
            <div className='opponent-avatar'>
            <img src={`/img/portrait-${match.player_two % 17}.png`} alt="User Avatar" />
            </div>
            
            <p>{`Match ID: ${match.id}`}</p>
            <p>{match.time_stamp}</p>
            <p>{`Player 1: ${match.player_two}`}</p>
            <p>{`Player 2: ${match.player_two}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

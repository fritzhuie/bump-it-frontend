import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [matchHistory, setMatchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    historyServices.getMatchHistory()
      .then(history => {
        // Fetch profiles for all opponents in the match history
        const profilePromises = history.map(match => profileServices.fetchProfile(match.opponentId));
        return Promise.all(profilePromises)
          .then(profiles => {
            // Combine match history with opponent profiles
            return history.map((match, index) => ({ ...match, opponentProfile: profiles[index] }));
          });
      })
      .then(combinedHistory => {
        setMatchHistory(combinedHistory);
      })
      .catch(error => {
        console.error('Failed to fetch match history:', error);
      });
  }, []);

  const handleMatchClick = (matchId) => {
    navigate(`/match-result/${matchId}`);
  };

  return (
    <div>
      <div className="match-result-header">
      <button className="close-button" onClick={handleGoToHistory}>
          X
        </button>
        <h1>Match Result</h1>
      </div>
      <ul>
        {matchHistory.map(match => (
          <li key={match.id} onClick={() => handleMatchClick(match.id)}>
            <img src={match.userAvatar} alt="User Avatar" />
            <img src={match.opponentProfile.avatar} alt="Opponent Avatar" />
            <p>{match.winnerName}</p>
            <p>{match.opponentProfile.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMatchResult } from "../../services/matchResultServices";
import { getProfile } from "../../services/profileServices";
import styles from "./MatchResult.module.css";

//Get an ID for the match it is set to display
const MatchResult = ({ fromGame }) => {
  // Add a prop to indicate if this is from a game session
  const [matchResult, setMatchResult] = useState({});
  const [profiles, setProfiles] = useState({});
  const [userProfiles, setUserProfiles] = useState({
    player1: {},
    player2: {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch match result
    getMatchResult()
      .then((results) => {
        const match = results[results.length - 1];
        console.log(results[results.length - 1]);
        setUserProfiles({
          player1: match.player_one,
          player2: match.player_two,
        });
        setMatchResult(match);
        return Promise.all([
          getProfile(match.player_one),
          getProfile(match.player_two),
        ]);
      })
      .then((profiles) => {
        console.log(profiles);
        setProfiles(profiles);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);

  const handlePlayAgain = () => {
    navigate("/game");
  };

  const handleGoToHistory = () => {
    navigate("/history");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.matchResultHeader}>
          <div className={styles.closeButtonContainer}>
            <button className={styles.closeButton} onClick={handleGoToHistory}>
              X
            </button>
          </div>
          <h1>Match Result</h1>
        </div>
      </div>
      <div className={styles.playerOne}>
        <div className={styles.userResultOne}>
          <div className={styles.userResultOneImageCont}>
          <img
            className={styles.userResultOneImage}
            src={`/img/portrait-${
              profiles[0] ? profiles[0].user % 17 : "0"
            }.png`}
          ></img>
          </div>
          <div className={styles.userResultOneDescription}>
            <h2>{profiles[0] ? profiles[0].name : ""}</h2>
            <p style={{fontSize: '22px'}} >Choice: {matchResult.userchoice_1}</p>
          </div>
          
        </div>
      </div>
      <div className={styles.versus}> VS. </div>
      <div className={styles.playerTwo}>
        <div className={styles.userResultTwo}>
          <div className={styles.userResultTwoDescription}>
            <h2>{profiles[1] ? profiles[1].name : ""}</h2>
            <p style={{fontSize: '22px'}}>Choice: {matchResult.userchoice_2}</p>
          </div>
          <div className={styles.userResultTwoImageCont}>
          <img
            className={styles.userResultTwoImage}
            src={`/img/portrait-${
              profiles[1] ? profiles[1].user % 17 : "0"
            }.png`}
          ></img>
          </div>
        </div>
      </div>
      <div className={styles.buttonClass}>
        <button className={styles.playAgainClass} onClick={handlePlayAgain}>
          Play Again
        </button>
        {fromGame && (
          <button className={styles.playAgainClass} onClick={handlePlayAgain}>
            Next
          </button>
        )}
        <button className={styles.matchHistoyClass} onClick={handleGoToHistory}>
          View Match History
        </button>
      </div>
    </div>
  );
};

export default MatchResult;

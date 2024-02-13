import React from 'react'
import { useNavigate } from 'react-router-dom'
import useBumpDetection from '../../services/bumpService'

const Game = () => {

  const navigate = useNavigate()

  const handleClickProfile = () => {
    navigate('/profile')
  }

  const handleClickHistory = () => {
    navigate('/history')
  }

  const { bumpDetected, accelerationData, lastBump } = useBumpDetection();

  return (
    <>
      <h1>Game</h1>
      <button onClick={handleClickProfile}>Profile</button>
      <button onClick={handleClickHistory}>History</button>

    <div>
      {bumpDetected && (
        <p>Bump detected! Last bump at: {lastBump?.toLocaleString()}</p>
      )}
      <p>Accelerometer Data: {accelerationData && JSON.stringify(accelerationData)}</p>
    </div>
    </>
  )
}

export default Game
import React from 'react'
import { useNavigate } from 'react-router-dom'


const Game = () => {

  const navigate = useNavigate()

  const handleHistoryNav = () => {
    navigate('/history')
  }

  return (
    <>
      <h1>Game page</h1>
      <button onClick={handleHistoryNav}>go to history page</button>
    </>
  )
}

export default Game
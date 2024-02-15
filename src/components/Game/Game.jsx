import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../../services/gameServices'
import { sendBump, getMatch } from '../../services/gameServices'
import { useState } from 'react'


const Game = () => {

  const navigate = useNavigate()

  const [choice, setChoice] = useState()
  const [isBumpEnabled, setIsBumpEnabled] = useState(true);

  const handleHistoryNav = () => {
    navigate('/history')
  }

  const handleBump = async () => {
    if (!choice || !isBumpEnabled) { return }

    setIsBumpEnabled(false)
    setChoice(null)

    // const response = await sendBump(choice)
    const response = await getMatch()
    console.log(response)

    setTimeout(() => setIsBumpEnabled(true), 1)
  }

  const handleSelection = (choice) => {
    if (!isBumpEnabled) { return }
    setChoice(choice)
  }

  let test = "waiting for bump"

  return (
    <>
      <h1>Game page</h1>
      <div>
        <button className='rock-button'
          style={{ borderRadius: '50%', 
          width: '100px', height: '100px', 
          backgroundColor: choice === "Rock" ? 'green' : 'grey'}} 
          onClick={() => handleSelection('Rock')}
        >
          Rock
        </button>
        <button className='paper-button'
          style={{ borderRadius: '50%', 
          width: '100px', height: '100px',
          backgroundColor: choice === "Paper" ? 'green' : 'grey' }} 
          onClick={() => handleSelection('Paper')}
        >
          Paper
        </button>
        <button className='scissors-button'
          style={{ borderRadius: '50%',
          width: '100px', height: '100px',
          backgroundColor: choice === "Scissors" ? 'green' : 'grey' }} 
          onClick={() => handleSelection('Scissors')}
        >
          Scissor
        </button>
      </div>
      <button onClick={handleHistoryNav}>go to history page</button>
      <button onClick={handleBump}>TEST BUMP</button>
      <p>{test}</p>
    </>
  )
}

export default Game
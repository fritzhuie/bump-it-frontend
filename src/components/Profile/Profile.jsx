import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

const navigate = useNavigate()
const handleClickGame = () => {
  navigate('/game')
}

return (
  <>
    <h1>Profile</h1>
    <button onClick={handleClickGame}>Home</button>
  </>
)

}

export default Profile


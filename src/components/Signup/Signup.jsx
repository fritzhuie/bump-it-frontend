import { useState } from 'react'
import SignupForm from '../../components/SignupForm/SignupForm'
import styles from './Signup.module.css'


const Signup = (props) => {
  const handleSignupOrLogin = props.handleSignupOrLogin
  const [message, setMessage] = useState([''])

  const updateMessage = msg => {
    setMessage(msg)
  }

  return (
    <main className={styles.signupContainer}>
      <h1 className={styles.header}>Bump It Up</h1>
      <p>{message}</p>
      <SignupForm handleSignupOrLogin={handleSignupOrLogin} updateMessage={updateMessage} />
    </main>
  )
}

export default Signup

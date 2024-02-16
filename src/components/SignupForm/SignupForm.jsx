import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import styles from './SignupForm.module.css'

const SignupForm = (props) => {

  const updateMessage = props.updateMessage
  const handleSignupOrLogin = props.handleSignupOrLogin
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConf: '',
  });

  const handleChange = (e) => {
    updateMessage('');
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      handleSignupOrLogin();
       navigate('/profile');
      console.log("made it past login")
    } catch (err) {
       updateMessage(err.message);
    }
  };

  const { username, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && email && password && password === passwordConf);
  };

  const handleClearForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      passwordConf: '',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className={styles.mb4}>
            <label htmlFor="username" className={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              className={`${styles.input}`}
              style={{display: 'flex',
                flexDirection: 'column'}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="text"
              autoComplete="off"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              
              className={`border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full ${styles.input}`}
              style={{display: 'flex',
                flexDirection: 'column'}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              className={`border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full ${styles.input}`}
              style={{display: 'flex',
                flexDirection: 'column'}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm" className={styles.label}>
              Confirm Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className={`border border-gray-500 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full ${styles.input}`}
              style={{display: 'flex',
                flexDirection: 'column'}}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              disabled={isFormInvalid()}
              className={`text-white bg-gray-500 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 w-full md:w-auto ${styles.button}`}
              style={{position: 'relative',
                top: '19px'}}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className={`${styles.button} ${styles.clearButton}`}
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;




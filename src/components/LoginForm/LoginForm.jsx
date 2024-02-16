import { useState } from 'react';
import styles from './LoginForm.module.css'
import { useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import './LoginForm.module.css';

const LoginForm = (props) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    props.updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(formData);
      props.handleSignupOrLogin();
      navigate('/profile');
    } catch (err) {
      props.updateMessage(err.message);
    }
  };

  const handleClear = () => {
    setFormData({
      username: '',
      password: '',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Log In</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div style={{display: 'flex', flexDirection: 'column'}} className={styles.mb4}>
            <label htmlFor="username" className={styles.label}>
              Username
            </label>
            <input
              type="text"
              autoComplete="off"
              id="username"
              value={formData.username}
              name="username"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'column', marginTop: '7%'}} className={styles.mb4}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              autoComplete="off"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <button
              type="submit"
              className={`${styles.button} ${styles.loginButton}`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={handleClear}
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

export default LoginForm;









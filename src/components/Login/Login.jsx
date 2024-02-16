import { useEffect, useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.css";
import logo from "../../logo.png";

const LoginPage = (props) => {
  const [message, setMessage] = useState([""]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  return (
    <>
      <div className={styles.overlay}>
        <img className={styles.logoImg} src={logo} />
      </div>
      <main className={styles.loginContainer}>
      <h1 className={styles.header}>Bump It Up</h1>
        <p>{message}</p>
        <LoginForm {...props} updateMessage={updateMessage} />
      </main>
    </>
  );
};

export default LoginPage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import loginService from '../../services/login';
import { Notification } from '../index';
import './Login.css'; // Import the Login.css file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      history('/dashboard'); // Use history instead of history.push

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className='login-button'>Login</button>
          <Link to="/register">
            <Typography align="center">Don't have an account? Register here</Typography>
          </Link>
        </form>
      </div>
      <Notification message={errorMessage} />
      {user && (
        <div>
          <p>{user.username} logged in</p>
        </div>
      )}
    </div>
  );
};

export default Login;

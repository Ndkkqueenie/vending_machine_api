import React, { useState } from 'react';
import { useUser } from '../index';
import './Login.css';

const Login = () => {
  const { dispatch } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleLogin = async () => {
    // Implement your login logic here
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        console.log(user)
        dispatch({ type: 'LOGIN', payload: user });
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button onClick={handleLogin} className='login-button'>Login</button>
      </div>
    </div>
  );
};

export default Login;

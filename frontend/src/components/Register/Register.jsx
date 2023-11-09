import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useUser } from '../../context/UserContext/UserContext';
import './Register.css';

const Register = () => {
  const { dispatch } = useUser();
  const [formData, setFormData] = useState({ username: '', password: '', role: 'buyer' });
  const [registrationError, setRegistrationError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const history = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const user = await response.json();
        dispatch({ type: 'LOGIN', payload: user });
        setRegistrationSuccess(true);
        setRegistrationError(null);

        // Redirect to the login page after successful registration
        history('/login');
      } else {
        // Handle registration error
        setRegistrationSuccess(false);
        setRegistrationError('Username is already in use.');
      }
    } catch (error) {
      console.error('Registration error', error);
      setRegistrationSuccess(false);
      setRegistrationError('An error occurred during registration.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {registrationError && <div className="error">{registrationError}</div>}
        {registrationSuccess && <div className="success">Registration successful!</div>}
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="input-container">
          Role: 
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
        <Link to="/login">
          <Typography align="center">Login instead</Typography>
        </Link>
      </div>
    </div>
  );
};

export default Register;

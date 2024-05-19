import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/login.css';

const Register = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      try {
        const response = await axios.post('http://localhost:8081/createUser', {
          name,
          address,
          email,
          password,
          mobile_number: mobileNumber
        });

        if (response.status === 201) {
          setIsRegistered(true);
          alert('Registration successful!');
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="login">
      {isRegistered ? (
        <div className="login">
          <h2>Registration Successful!</h2>
          <p>Welcome, {name}!</p>
          <button onClick={() => navigate('/')}>Login Here</button>
        </div>
      ) : (
        <div className="login-form">
          <h2>Register</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
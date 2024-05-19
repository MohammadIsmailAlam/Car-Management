import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Style/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
  };

  const handleLogin = async () => {
    if (isAdmin) {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        setIsLoggedIn(true);
        navigate('/dashboard');
      } else {
        alert('Invalid admin credentials!');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8081/login', {
          email,
          password
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate('/dashboard');
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>Login</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Admin Login:</label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p>
          Don't have an account? <Link to="/reg">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

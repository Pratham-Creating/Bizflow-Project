
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <section>
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="inputBx">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="inputBx">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="inputBx">
              <input type="submit" value="Login" />
            </div>
          </form>
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
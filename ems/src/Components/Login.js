import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import banner from './login.jpg'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const history = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('http://192.168.1.106:5001/api/auth/login', {
  //       email,
  //       password
  //     });

  //     if (response.status === 200) {
  //       alert('Login successful');
  //       history.push('/events'); // Redirect to '/events' route
  //     } else {
  //       setLoginError('Login failed: ' + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Login error:', error);
  //     setLoginError('An error occurred during login. Please try again.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.1.106:5001/api/auth/login', {
        email,
        password
      });
  
      if (response.status === 200) {
        alert('Login successful');
        history('/events'); // Redirect to '/events' route
      } else {
        setLoginError('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      setLoginError('An error occurred during login. Please try again.');
    }
  };

  return (
    // <div className="container">
    //   <h2>Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="form-group">
    //       <label>Email:</label>
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div className="form-group">
    //       <label>Password:</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">Login</button>
    //   </form>
    //   {loginError && <p>{loginError}</p>}
    //   <p>
    //     Don't have an account? <a href="/signup">Sign up</a>
    //   </p>
    // </div>
    <div className="full-screen">
        <div className="image-section">
            <img src={banner} alt="Background Image"></img>
        </div>
        <div class="login-section">
        <h2>Login</h2>
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <label>Email:</label>
           <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
        </div>
    </div>
  );
};

export default Login;

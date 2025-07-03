import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  // Get the redirect path and booking data from location state
  const redirectPath = location.state?.from || '/';
  const bookingData = location.state?.bookingData || {};

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/customer/login', formData);

      const { token, customer } = response.data;

      // Store user information in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('email', customer.email);
      localStorage.setItem('customerId', customer.id);

      // Success message
      message.success('Login successful!');

      // Redirect user to the page they came from with booking data
      navigate(redirectPath, { state: bookingData });
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed!';
      message.error(errorMsg);
      console.error('Axios login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-section">
        <div className="back-icon" onClick={() => navigate('/')}>
          <i className="fas fa-arrow-left back-arrow" style={{ marginRight: '5px' }}></i>
        </div>

        <div className="form-wrapper">
          <h1 className="login-title">Welcome Back</h1>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="register-text">
            <p>
              Don't have an account?{' '}
              <span className="register-link" onClick={() => navigate('/register')}>
                Register here
              </span>
            </p>
          </div>
        </div>
      </div>

      <div
        className="login-image-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>
    </div>
  );
};

export default Login;

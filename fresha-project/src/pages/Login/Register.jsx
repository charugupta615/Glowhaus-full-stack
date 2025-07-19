import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);  // Loading state
  const [isSuccessful, setIsSuccessful] = useState(false); // State to track registration success

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);  // Start loading
    try {
      const response = await axios.post('https://glowhaus-full-stack.onrender.com/api/customer/register', formData);
      if(isSuccessful) {
        setIsSuccessful(true);
        console.log('Registration response:', response.data); // Log the response data
        message.success('Registration successful!'); // Show success message
      }
      message.success('Customer registered successfully!');
      // Navigate to login page after successful registration
      navigate('/login');
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed!';
      message.error(errorMsg);  // Show error message if registration fails
      console.error('Registration error:', error);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="register-container">
      {/* Left Section with Form */}
      <div className="form-box">
        <div className="back-icon" onClick={() => navigate('/landing')}>
          <i className="fas fa-arrow-left back-arrow" style={{ marginRight: '5px' }}></i>
        </div>

        <h1 className="form-title">Register as a Customer</h1>
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />

          <label>Password</label>
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          <button type="submit" className="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="login-text">
          Already have an account?{' '}
          <span className="login-link" onClick={() => navigate('/login')}>
            Login here
          </span>
        </p>
      </div>

      {/* Right Section with Image */}
      <div
        className="image-box"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>
    </div>
  );
};

export default Register;

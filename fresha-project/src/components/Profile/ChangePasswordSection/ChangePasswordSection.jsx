import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './ChangePasswordSection.css';

const ChangePasswordSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');

      const response = await axios.put(
        'http://localhost:5000/api/customer/change-password',
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Password updated successfully!');
        setError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while updating the password.');
      setSuccessMessage('');
    }
  };

  return (
    <form className="info-form" onSubmit={handlePasswordChange}>
      <div className="form-group">
        <label>Current Password <span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <span onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="eye-icon">
            {showCurrentPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          </span>
        </div>
      </div>
      <div className="form-group">
        <label>New Password <span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span onClick={() => setShowNewPassword(!showNewPassword)} className="eye-icon">
            {showNewPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          </span>
        </div>
      </div>
      <div className="form-group">
        <label>Confirm Password <span className="required">*</span></label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
            {showConfirmPassword ? <EyeTwoTone /> : <EyeInvisibleOutlined />}
          </span>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <button type="submit" className="save-btn">Update Password</button>
    </form>
  );
};

export default ChangePasswordSection;

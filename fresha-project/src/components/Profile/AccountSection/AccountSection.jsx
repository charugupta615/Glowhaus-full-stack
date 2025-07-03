import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './AccountSection.css';

const AccountSection = ({ customerData, setCustomerData }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    const gender = e.target.value;
    setCustomerData((prevState) => ({
      ...prevState,
      gender,
    }));
  };

  const handleAccountSave = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    if (!customerId) {
      message.error('No customer ID found.');
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/customer/display/${customerId}`,
        customerData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success('Profile updated successfully!');
        setSuccessMessage('Changes saved successfully!');
      }
    } catch (err) {
      console.error('Update error:', err);
      message.error('Error updating account information.');
    }
  };

  return (
    <form className="info-form" onSubmit={handleAccountSave}>
      <div className="form-row">
        <div className="form-group">
          <label>Name <span className="required">*</span></label>
          <input type="text" name="name" value={customerData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth <span className="required">*</span></label>
          <input type="date" name="date_of_birth" value={customerData.date_of_birth} onChange={handleInputChange} />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Mobile Number <span className="required">*</span></label>
          <input type="text" name="phone" value={customerData.phone} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={customerData.email} readOnly />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Gender <span className="required">*</span></label>
          <div className="gender-options">
            <label><input type="radio" name="gender" value="Male" checked={customerData.gender === 'Male'} onChange={handleGenderChange} /> Male</label>
            <label><input type="radio" name="gender" value="Female" checked={customerData.gender === 'Female'} onChange={handleGenderChange} /> Female</label>
          </div>
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={customerData.city} onChange={handleInputChange} />
        </div>
      </div>
      <button type="submit" className="save-btn">Save Changes</button>
      {successMessage && <div className="success-message">{successMessage}</div>}
    </form>
  );
};

export default AccountSection;

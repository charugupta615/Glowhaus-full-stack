import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectServices.css';

const SelectServices = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (!state?.store?.id) {
      alert('Store information not available.');
      navigate('/'); // Redirect to home if store is not passed
      return;
    }

    // Fetch services for the selected store
    axios.get(`http://localhost:5000/api/service/store/${state.store.id}`)
      .then(res => setServices(res.data)) // Store the fetched services in state
      .catch(err => console.error('Failed to fetch services:', err));
  }, [state, navigate]);

  const toggleService = (id) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    navigate('/select-team', { state: { ...state, selectedServices } });
  };

  return (
    <div className="select-services-container">
      <h2>Select Services</h2>
      <div className="services-list">
        {services.map(service => (
          <div
            key={service.id}
            className={`service-item ${selectedServices.includes(service.id) ? 'selected' : ''}`}
            onClick={() => toggleService(service.id)}
          >
            <h4>{service.name}</h4>
            <p>{service.duration}</p>
            <p>{service.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handleContinue} disabled={selectedServices.length === 0}>Continue</button>
    </div>
  );
};

export default SelectServices;

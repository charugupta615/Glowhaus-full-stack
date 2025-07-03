import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service, onSelect }) => {
  return (
    <div className="service-card1" onClick={() => onSelect(service)}>
      <h4>{service.name}</h4>
      <p>{service.duration}</p>
      <p>{service.price}</p>
      <button className='ser-btn'>+</button>
    </div>
  );
};

export default ServiceCard;

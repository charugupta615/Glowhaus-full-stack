import React from 'react';
import './ProfessionalCard.css';

const ProfessionalCard = ({ name, rating, role, image }) => {
  return (
    <div className="card">
      <img src={image} alt={name} className="card-img" />
      <h4>{name}</h4>
      <p>{role}</p>
      <span className="rating">⭐ {rating}</span>
    </div>
  );
};

export default ProfessionalCard;

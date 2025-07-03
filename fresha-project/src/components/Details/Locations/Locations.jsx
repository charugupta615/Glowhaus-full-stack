import React from 'react';
import locationsData from '../../../data/locationsData';
import './Locations.css';

const Locations = () => {
  return (
    <div className="locations-page">
      <h2 className="location-heading">Other locations</h2>
      <div className="locations-container">
        {locationsData.map((location, index) => (
          <div className="location-card" key={index}>
            <img src={location.image} alt={location.name} />
            <h3 className="location-name">{location.name}</h3>
            <div className="location-info">
              <p className="location-rating">{location.rating} ⭐ ({location.reviews})</p>
              <p className="location-address">{location.address}</p>
            </div>
            <button className="category-button">{location.category}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;

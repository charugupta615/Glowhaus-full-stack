import React from 'react';
import venuesData from '../../../data/venuesData';
import './VenuesNearby.css';

const VenuesNearby = () => {
  return (
    <div className="venues-page">
      <h2 className="venue-heading">Venues nearby</h2>
      <div className="venues-container">
        {venuesData.map((venue, index) => (
          <div className="venue-card" key={index}>
            <img src={venue.image} alt={venue.name} />
            <h3 className="venue-name">{venue.name}</h3>
            <div className="venue-details">
              {venue.reviews > 0 ? (
                <p className="venue-rating">{venue.rating} ⭐ ({venue.reviews})</p>
              ) : (
                <p className="venue-rating">No reviews yet</p>
              )}
              <p className="venue-address">{venue.address}</p>
            </div>
            <button className="venue-category">{venue.category}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuesNearby;

import React from 'react';
import './ReviewsSection.css';

const ReviewCard = ({ data }) => {
  return (
    <div className="review-card">
      <div className="review-title2">
        <div className="stars">{'★'.repeat(Math.round(data.rating))}</div>
        <p>{data.comment}</p>
      </div>
      <div className="reviewer-info">
        <div>
          <h4>{data.customer_name}</h4>
          <p>{new Date(data.created_at).toLocaleDateString()}</p> 
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

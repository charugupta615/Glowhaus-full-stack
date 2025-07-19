import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({ data }) => {
  const navigate = useNavigate();

  // Prefer main_image, fallback to image
  const imagePath = data.main_image || data.image;

  // Log the image path for debugging
  console.log("Card image path:", imagePath);

  const handleNavigate = () => {
    if (data.slug) {
      navigate(`/business/${data.slug}`);
    }
  };

  return (
    <div className="card" onClick={handleNavigate}>
      <img src={`https://glowhaus-full-stack.onrender.com${imagePath}`} alt={data.name} />
      <div className="card-details">
        <h3 className="hsec">{data.name}</h3>
        <p>
          {data.average_rating ? `${data.average_rating} ⭐` : 'No Rating'}
          {data.total_reviews !== undefined ? ` (${data.total_reviews} reviews)` : ''}
        </p>
        <p>{data.address}</p>
        <button className="category-button1">
          {data.category?.name || 'Uncategorized'}
        </button>
      </div>
    </div>
  );
};

export default Card;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Favorites.css';
import Navbar from '../../Navbar/Navbar';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const customerId = localStorage.getItem('customerId');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get(`https://glowhaus-full-stack.onrender.com/api/favorites/display/${customerId}`);
        setFavorites(res.data);
      } catch (error) {
        if (error.response?.status === 404) {
          console.warn('Favorites not found for this customer.');
          setFavorites([]); // Set an empty array if no favorites are found
        } else {
          console.error('Failed to fetch favorites:', error);
        }
      }
    };

    if (customerId) {
      fetchFavorites();
    }

    const handleFavoritesUpdated = () => {
      if (customerId) {
        fetchFavorites(); 
      }
    };

    window.addEventListener('favoritesUpdated', handleFavoritesUpdated);

    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdated);
    };
  }, [customerId]);

  const handleBusinessClick = (slug) => {
    navigate(`/business/${slug}`);
  };

  return (
    <>
      <Navbar />
      <div className="favorites-container">
        <h2>Favourites</h2>
        <div className="favorites-grid">
          {favorites.length === 0 ? (
            <p>No favorite businesses yet.</p>
          ) : (
            favorites.map((fav) => (
              <div
                key={`favorite-${fav.business.id}`}
                className="favorite-card"
                onClick={() => handleBusinessClick(fav.business.slug)}
              >
                <img
                  src={`https://glowhaus-full-stack.onrender.com${fav.business.images[0]}`}
                  alt={fav.business.name}
                  className="store-image"
                />
                <FaHeart className="heart-icon" color="red" />
                <div className="store-details">
                  <h3>{fav.business.name}</h3>
                  <div className="rating">
                    <span>{fav.business.rating}</span>
                    <span className="review-count">({fav.business.votes})</span>
                  </div>
                  <p className="address">{fav.business.address}</p>
                  <span className="category-tag">{fav.business.category?.name}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;

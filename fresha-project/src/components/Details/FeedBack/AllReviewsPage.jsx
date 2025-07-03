import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AllReviewsPage.css';

const AllReviewsPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const reviews = state?.reviews || [];

  const [selectedStars, setSelectedStars] = useState([]);

  const toggleStarFilter = (star) => {
    setSelectedStars((prev) =>
      prev.includes(star)
        ? prev.filter((s) => s !== star)
        : [...prev, star]
    );
  };

  const filteredReviews =
    selectedStars.length > 0
      ? reviews.filter((r) =>
          selectedStars.includes(Math.floor(r.rating))
        )
      : reviews;

  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? '' : date.toLocaleString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="reviews-wrapper">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>

      <h2 className="page-title">Reviews</h2>
      <p className="review-count">{filteredReviews.length} reviews</p>

      <div className="review-content">
        <div className="review-list">
          {filteredReviews.map((review, idx) => (
            <div className="review-entry" key={idx}>
              <div className="review-user">
                <div className="user-avatar">{getInitials(review.customer_name)}</div>
                <div className="user-info">
                  <strong>{review.customer_name}</strong>
                  <div className="review-date">{formatDate(review.date)}</div>
                </div>
              </div>
              <div className="review-stars">
                {'★'.repeat(Math.round(review.rating))}
                {'☆'.repeat(5 - Math.round(review.rating))}
              </div>
              <p className="review-text">{review.comment}</p>
            </div>
          ))}
        </div>

        <div className="review-sidebar">
          <div className="rating-summary">
            <div className="star-row">★★★★★</div>
            <p><strong>{avgRating}</strong> • {reviews.length} reviews</p>
          </div>

          <div className="filter-block">
            <p>Filter by rating</p>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.filter((r) => Math.floor(r.rating) === star).length;
              const percentage = reviews.length ? (count / reviews.length) * 100 : 0;
              const isChecked = selectedStars.includes(star);

              return (
                <div key={star} className="filter-row">
                  <input
                    type="checkbox"
                    id={`star-${star}`}
                    checked={isChecked}
                    onChange={() => toggleStarFilter(star)}
                  />
                  <label htmlFor={`star-${star}`}>{star}</label>
                  <div className="filter-bar1">
                    <div className="filter-bar-fill" style={{ width: `${percentage}%` }} />
                  </div>
                  <span className="review-count-text">{count}</span>
                </div>
              );
            })}
          </div>

          <div className="trust-box">
            <p className="trust-title">Reviews you can trust</p>
            <p className="trust-sub">All our ratings are from genuine customers, following verified visits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReviewsPage;

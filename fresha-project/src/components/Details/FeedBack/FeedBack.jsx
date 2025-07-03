import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedBack.css';

const FeedbackCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);
  const initials = review.customer_name?.split(' ').map((n) => n[0]).join('') || 'U';

  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <div className="avatar">{initials}</div>
        <div>
          <h4>{review.customer_name}</h4>
        </div>
      </div>
      <div className="feedback-rating">
        {'★'.repeat(review.rating)}
        {'☆'.repeat(5 - review.rating)}
      </div>
      <p className="feedback-comment">
        {expanded ? review.comment : `${review.comment.substring(0, 100)}...`}
        {review.comment.length > 100 && (
          <span className="read-more" onClick={toggleExpanded}>
            {expanded ? ' Read less' : ' Read more'}
          </span>
        )}
      </p>
    </div>
  );
};

const FeedBack = ({ reviews }) => {
  const avgRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const navigate = useNavigate();
  const handleSeeAll = () => {
    navigate('/reviews', { state: { reviews } });
  };

  return (
    <section className="feedback-section">
      <h2 className="feedback-heading">Reviews</h2>
      <div className="feedback-summary">
        <span className="feedback-rating-summary">⭐ {avgRating}</span>
        <span className="total-reviews">({reviews.length})</span>
      </div>
      <div className="feedback-container">
        {reviews.slice(0, 3).map((review, index) => (
          <FeedbackCard key={index} review={review} />
        ))}
      </div>
      {reviews.length > 3 && (
        <button className="see-all-reviews-btn" onClick={handleSeeAll}>
          See All
        </button>
      )}
    </section>
  );
};

export default FeedBack;

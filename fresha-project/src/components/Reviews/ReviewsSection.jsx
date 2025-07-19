

// import React from 'react';
// import ReviewCard from './ReviewCard';
// import reviewsData from '../../data/reviewsData';
// import './ReviewsSection.css';

// const ReviewsSection = () => {
//   return (
//     <section className="reviews-section">
//       <h2 className="review-title">Reviews</h2>
//       <div className="reviews-container">
//         {reviewsData.map((review) => (
//           <ReviewCard key={review.id} data={review} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default ReviewsSection;






import React, { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import './ReviewsSection.css';

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://glowhaus-full-stack.onrender.com/api/reviews') // Replace with your specific API endpoint if needed
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching reviews:', err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="reviews-section">
      <h2 className="review-title">Reviews</h2>
      <div className="reviews-container">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} data={review} />
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;

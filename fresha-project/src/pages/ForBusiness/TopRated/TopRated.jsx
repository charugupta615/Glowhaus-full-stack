import React from 'react';
import './TopRated.css';
import barberImage from '../../../assets/images/barberImage.jpg'; 

const TopRated = () => {
  return (
    <section className="industry-section">
      <h1 className="industry-title">Top-rated by the industry</h1>
      <p className="industry-description">
        Being the world's most-loved platform doesn't happen by accident. Our dedication to building the best-in-class
        booking software and delivering exceptional customer experience continues to be recognized in the industry time and time again. 
        Discover some of our amazing partners and see why they love Fresha.
      </p>

      <div className="industry-content">
        {/* Business Image */}
        <div className="barber-image-container">
          <img src={barberImage} alt="Barber Shop" className="barber-image" />
        </div>

        {/* Reviews Section */}
        <div className="reviews-container1">
          <div className="review-card1">
            <div className="stars">★★★★★</div>
            <h3>Fresha is so easy to manage my team</h3>
            <p>
              I work with booth renters at my top-rated salon in Manhattan, New York City. I love Fresha because it offers my
              clients a professional appointment booking experience with seamless online booking features.
            </p>
            <p className="reviewer">— Pamela B</p>
          </div>

          <div className="review-card1">
            <div className="stars">★★★★★</div>
            <h3>My clients love Fresha</h3>
            <p>
              Fresha is the top-rated booking software with all the features you need as a salon business. My clients love
              booking, appointments, and scheduling on Fresha.
            </p>
            <p className="reviewer">— Alex E</p>
          </div>

          <div className="review-card1">
            <div className="stars">★★★★★</div>
            <h3>Fresha has transformed my business</h3>
            <p>
              Switching to Fresha was the best decision for my salon. It's user-friendly and helps me manage bookings with ease.
            </p>
            <p className="reviewer">— Chris W</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRated;

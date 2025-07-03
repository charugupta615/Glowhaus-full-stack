import React from 'react';
import './BusinessOverview.css';

const BusinessOverview = () => {
  return (
    <section className="business-overview">
      <h1>Everything you need to run your business</h1>
      <p>Glowhaus offers innovative features that bring convenience, efficiency, and an improved experience for both your team members and clients.</p>
      
      <section className="business-features">
        <div className="feature-card">
          <h2>Manage</h2>
          <p>Manage bookings, sales, clients, locations, team members. Analyse your business with advanced reporting and analytics.</p>
        </div>

        <div className="feature-card">
          <h2>Grow</h2>
          <p>Win new clients on the world’s largest beauty and wellness marketplace. Keep them coming back with marketing features.</p>
        </div>

        <div className="feature-card">
          <h2>Get paid</h2>
          <p>Get paid fast with seamless payment processing. Reduce no-shows with upfront payments and simplify checkout.</p>
        </div>
      </section>
    </section>
  );
};

export default BusinessOverview;

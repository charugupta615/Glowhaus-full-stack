import React from 'react';
import './Appointments.css';

const Appointments = () => {
  return (
    <section className="appointments-section">
      <div className="header1">
        <h>The top-rated destination for beauty and wellness</h>
        <p>One solution, one software. Trusted by the best in the beauty and wellness industry</p>
      </div>

      <div className="billion-section">
        <h1><span className="billion-text">1 billion+</span></h1>
        <p>Appointments booked on Glowhaus</p>
      </div>

      <div className="stats-section">
        <div>
          <h1>120,000+</h1>
          <p>Partner businesses</p>
        </div>
        <div>
          <h1>120+ countries</h1>
          <p>Using Glowhaus</p>
        </div>
        <div>
          <h1>450,000+</h1>
          <p>Stylists and professionals</p>
        </div>
      </div>
    </section>
  );
};

export default Appointments;

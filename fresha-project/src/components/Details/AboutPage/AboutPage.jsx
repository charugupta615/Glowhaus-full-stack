import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="left-section">
        <h2 className="about-heading1">About</h2>
        <p className="about-para">
          The Groom Room Barber Shop is an upscale, bespoke gentleman's barber shop that offers today's progressive
          gentlemen a haven where he can sit back, relax and experience the World Class art of grooming and services in a
          very relaxed atmosphere, which is masculine and therapeutic. In addition to grooming services for the young man
          and professional, our qualified staff also offer hair cutting services for young children.
        </p>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25284.789870098713!2d50.550164774416774!3d26.122814954291753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ae23e88f1a4f%3A0xa3f8e1b8e7b9d1d3!2sRiffa%2C%20Bahrain!5e0!3m2!1sen!2sin!4v1711486922675!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: '0' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

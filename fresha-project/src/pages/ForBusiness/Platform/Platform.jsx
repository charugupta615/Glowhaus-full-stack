import React from 'react';
import './Platform.css';
import salon from '../../../assets/images/salon.jpg';
import barber from '../../../assets/images/barber.jpg';
import nails from '../../../assets/images/nails.jpg';
import spa from '../../../assets/images/spa.jpg';
import skincare from '../../../assets/images/skincare.jpg';
import massage from '../../../assets/images/massage.jpg';

const services = [
  { title: 'Salon', img: salon },
  { title: 'Barber', img: barber },
  { title: 'Nails', img: nails },
  { title: 'Spa', img: spa },
  { title: 'Skin Care', img: skincare },
  { title: 'Massage', img: massage },
];

const Platform = () => {
  return (
    <div className="platform">
      <section className="platform-header">
        <h1>One platform, infinite possibilities</h1>
        <p>
          Everything you need to grow and thrive. Fresha is packed with tools to boost sales, manage your calendar, and retain clients, so you can focus on what you do best.
        </p>
        <button className="get-started-btn">Get started now →</button>
      </section>

      <section className="services-grid1">
        {services.map((service, index) => (
          <div key={index} className="service-card1" style={{ backgroundImage: `url(${service.img})` }}>
            <div className="service-info1">
              <h2>{service.title}</h2>
              <span className="arrow">→</span>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Platform;
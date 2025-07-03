import React from 'react';
import './ForBusiness.css';
import forbusiness from '../../assets/images/Fresha-UX.webp';
import bg from '../../assets/images/bg.jpg';
import Platform from './Platform/Platform';
import Certifications from './Certifications/Certifications';
import BusinessOverview from './BusinessOverview/BusinessOverview';
import Software from './Software/Software';          
import Market from './Market/Market';
import TopRated from './TopRated/TopRated';
import HeaderBusiness from './HeaderBusiness/HeaderBusiness';
import CustomerSupport from './CustomerSupport/CustomerSupport';
import FAQSection from './FAQSection/FAQSection';
import Category from './Category/Category';
import Hero from './Hero/Hero';
import MobileApps from './MobileApps/MobileApps';
import Footer from '../../components/Footer/Footer';

const ForBusiness = () => {
  return (
    <>
    <HeaderBusiness/>
      <div className="for-business-container" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-section">
          <h1>The #1 software for Salons and Spas</h1>
          <p>Simple, flexible, and powerful booking software for your business.</p>
          <div className="button-group">
            <button className="get-started-btn1">Get started now</button>
            <button className="watch-overview-btn">Watch an overview</button>
          </div>
        </div>

        <div className="business-images1">
          <img src={forbusiness} alt="For Business 1" className="main-image1" />
        </div>

        <div className="statistics-section">
          <div className="stat-card1">
            <h2>Most recommended</h2>
            <p2>5/5</p2>
            <span>on Capterra</span>
          </div>
          <div className="stat-card">
            <h2>120,000+</h2>
            <p>Partner businesses</p>
          </div>
          <div className="stat-card">
            <h2>450,000+</h2>
            <p>Professionals</p>
          </div>
          <div className="stat-card">
            <h2>1 Billion+</h2>
            <p>Appointments booked</p>
          </div>
          <div className="stat-card">
            <h2>120+</h2>
            <p>Countries</p>
          </div>
        </div>
      </div>
      <Platform/>
      <Certifications/>
      <BusinessOverview/>
      <Software/>
      <Market/>
      <TopRated/>
      <CustomerSupport/>
      <FAQSection/>
      <Category/>
      <Hero/>
      <MobileApps/>
      <Footer/>
    </>
  );
};

export default ForBusiness;

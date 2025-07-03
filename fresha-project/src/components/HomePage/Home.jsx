import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="content-wrapper">
        <h1 className="main-heading">Book local beauty and<br /> wellness services</h1>

        <div className="search-wrapper">
          <div className="search-bar">
            <div className="search-section">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="All treatments and venues" />
            </div>
            <div className="search-section">
              <i className="fas fa-map-marker-alt"></i>
              <input type="text" placeholder="Current location" />
            </div>
            <div className="search-section">
              <i className="far fa-calendar"></i>
              <input type="text" placeholder="Any date" />
            </div>
            <div className="search-section">
              <i className="far fa-clock"></i>
              <input type="text" placeholder="Any time" />
            </div>
            <button className="search-button">Search</button>
          </div>
        </div>

        {/* <p className="appointment-count">5,88,530 appointments booked today</p> */}
        <button className="app-button">Get the app</button>
      </div>
    </div>
  );
};

export default Home;

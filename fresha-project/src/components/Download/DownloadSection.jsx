import React from 'react';
import './DownloadSection.css';
import appPreview from '../../assets/images/appPreview.webp';

const DownloadSection = () => {
  return (
    <section id="download">
      {/* Left Section */}
      <div id="app">
        <h5>Available on</h5>
        <i className="fa-brands fa-apple"></i>
        <i className="fa-brands fa-google-play"></i>
        <h1>Download the<br />Fresha app</h1>
        <p>
          Book unforgettable beauty and wellness experiences <br />
          with the Fresha mobile app
        </p>
        <a href="#" className="btn">
        <img src="https://th.bing.com/th/id/OIP.iVT8onjjn8mo3L9LM_SUgQHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
        </a>
      </div>

      {/* Right Section */}
      <div id="img">
      <img src={appPreview} alt="App Preview"/>
        <img
          src="https://th.bing.com/th/id/OIP.36SZzut5VoT1kvwfSo0bNAAAAA?rs=1&pid=ImgDetMain"
          alt="App Preview"
        />
      </div>
    </section>
  );
};

export default DownloadSection;

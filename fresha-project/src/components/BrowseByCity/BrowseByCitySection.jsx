import React, { useState } from 'react';
import './BrowseByCitySection.css';
import cityData from '../../data/cityData';

const BrowseByCitySection = () => {
  const [selectedCountry, setSelectedCountry] = useState('Australia');

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <section className="browse-by-city-section">
      <div className="header-section">
        <h2 className="city-heading">Browse by City</h2>
        <div className="country-list">
          {Object.keys(cityData).map((country) => (
            <button
              key={country}
              className={selectedCountry === country ? 'active' : ''}
              onClick={() => handleCountryClick(country)}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      <div className="city-list">
        {cityData[selectedCountry].map((city, index) => (
          <div key={index} className="city">
            <h3>{city.name}</h3>
            <ul>
              {city.services.map((service, i) => (
                <li key={i}>{service}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseByCitySection;

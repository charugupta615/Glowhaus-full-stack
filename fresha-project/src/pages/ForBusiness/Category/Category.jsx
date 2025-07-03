import React from 'react';
import './Category.css';
import salon from '../../../assets/images/salon.jpg';
import barber from '../../../assets/images/barber.jpg';
import nails from '../../../assets/images/nails.jpg';
import spa from '../../../assets/images/spa.jpg';
import skincare from '../../../assets/images/skincare.jpg';
import massage from '../../../assets/images/massage.jpg';

// Category data with images and links
const categories = [
  { name: 'Salon', image: salon, link: 'for-business/salon' },
  { name: 'Barber', image: barber, link: 'for-business/barber' },
  { name: 'Nails', image: nails, link: 'for-business/nails' },
  { name: 'Spa', image: spa, link: 'for-business/spa' },
  { name: 'Skincare', image: skincare, link: 'for-business/skincare' },
  { name: 'Massage', image: massage, link: 'for-business/massage' },
];

// Duplicate categories for infinite effect
const repeatedCategories = [...categories, ...categories];

const Category = () => {
  return (
    <div className="category-container">
      <h1 className="category-title">A platform suitable for all</h1>
      
      <div className="category-grid">
        {/* First Line: Left to Right */}
        <div className="line-1">
          {repeatedCategories.map((category, index) => (
            <a
              key={`line1-${index}`}
              href={category.link}
              className="category-card"
            >
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className="category-name">{category.name}</span>
            </a>
          ))}
        </div>

        {/* Second Line: Right to Left */}
        <div className="line-2">
          {repeatedCategories.map((category, index) => (
            <a
              key={`line2-${index}`}
              href={category.link}
              className="category-card"
            >
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className="category-name">{category.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;




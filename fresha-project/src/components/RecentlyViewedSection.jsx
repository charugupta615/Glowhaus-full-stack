import React from 'react';
import Card from './Card/Card';
import recentlyViewedData from '../data/recentlyViewedData';

const RecentlyViewedSection = () => {
  return (
    <section>
      <h2 className="section-title3">Recently Viewed</h2>
      <div className="card-container">
        {recentlyViewedData.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;


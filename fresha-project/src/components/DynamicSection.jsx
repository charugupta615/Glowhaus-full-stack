import React from 'react';
import Card from './Card/Card';

const DynamicSection = ({ sections }) => {
  if (!sections || sections.length === 0) return null;

  return (
    <div>
      {sections.map((section) => (
        <section key={section.slug}>
          <h2 className="section-title">{section.name}</h2>
          <div className="card-container">
            {section.business
              .filter((item) => item.status === 'active')
              .map((item) => {
                console.log("Item data:", item);

                return <Card key={item.id} data={item} />;
              })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DynamicSection;










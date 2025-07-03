import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = ({ servicesData, teamData, businessData }) => {
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [flattenedServices, setFlattenedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (servicesData && servicesData.length > 0) {
      const allServices = servicesData.flatMap(group =>
        group.services.map(service => ({
          ...service,
          category: group.service_type,
          featured: true,  // Assuming every service is featured for now
        }))
      );

      const uniqueCategories = [
        'Featured',
        ...new Set(allServices.map(service => service.category))
      ];

      setFlattenedServices(allServices);
      setCategories(uniqueCategories);
      setLoading(false);  // Set loading to false once data processing is done
    } else {
      setLoading(false);  // In case servicesData is empty
    }
  }, [servicesData]);

  const filteredServices =
    selectedCategory === 'Featured'
      ? flattenedServices
      : flattenedServices.filter(service => service.category === selectedCategory);

  const visibleServices = showAll ? filteredServices : filteredServices.slice(0, 4);

  const handleBook = (service) => {
    console.log('Business Data:', businessData);
    if (businessData && businessData.slug) { // Ensure businessData has the ID
      navigate(`/business/${businessData.slug}/selection`, {
        state: {
          selectedService: service,
          servicesData,
          business: businessData,
        },
      });
    } else {
      console.error("Business data is missing or incorrect");
    }
  };

  return (
    <div className="content-container">
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="services-list">
          <h2 className="services-heading">Services</h2>

          <div className="filter-buttons">
            {categories.map(category => (
              <Button
                key={category}
                type={selectedCategory === category ? 'primary' : 'default'}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowAll(false);
                }}
              >
                {category}
              </Button>
            ))}
          </div>

          {filteredServices.length > 0 ? (
            <>
              {visibleServices.map((service, index) => (
                <Card key={index} className="service-card">
                  <div className="service-info">
                    <div>
                      <h3>{service.service_name}</h3>
                      <p>{service.duration}</p>
                      <p>{service.price} BHD</p>
                    </div>
                    <Button
                      className="n-ser-btn"
                      type="primary"
                      onClick={() => handleBook(service)}
                    >
                      Book
                    </Button>
                  </div>
                </Card>
              ))}
              {!showAll && filteredServices.length > 4 && (
                <Button type="link" onClick={() => setShowAll(true)}>View All</Button>
              )}
            </>
          ) : (
            <p>No services available for {selectedCategory}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Services;

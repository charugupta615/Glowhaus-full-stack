import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AppointmentPage.css';

const servicesData = [
  { id: 1, name: 'Haircut', duration: '30 mins', price: 6, category: 'Featured' },
  { id: 2, name: 'Beard Tune-up', duration: '25 mins', price: 3, category: 'Featured' },
  { id: 3, name: 'Haircut (Kid)', duration: '30 mins', price: 6, category: 'Featured' },
  { id: 4, name: 'Facial', duration: '40 mins', price: 8, category: 'Face' },
  { id: 5, name: 'Nail Care', duration: '45 mins', price: 10, category: 'Nails' },
  { id: 6, name: 'Hand Massage', duration: '45 mins', price: 10, category: 'Massage' },
];

const categories = Array.from(new Set(['Featured', ...servicesData.map(service => service.category)]));

const AppointmentPage = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Featured');
  const [modalService, setModalService] = useState(null);
  const navigate = useNavigate();

  const handlePlusClick = (service, e) => {
    if (e) e.stopPropagation();

    const isServiceSelected = selectedServices.find((item) => item.id === service.id);

    if (isServiceSelected) {
      setSelectedServices((prev) => prev.filter((item) => item.id !== service.id));
    } else {
      setSelectedServices((prev) => [...prev, service]);
    }

    setModalService(null);
  };

  const handleCardClick = (service) => {
    setModalService(service);
  };

  const closeModal = () => {
    setModalService(null);
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      navigate('/select-professional', { state: { selectedServices } });
    }
  };

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const filteredServices = servicesData.filter((service) => service.category === selectedCategory);

  return (
    <div className="appointment-page-container">
      <h2 className="app-heading">Select Services</h2>

      {/* Category Tabs */}
      <div className="appointment-category-tabs">
        {categories.map((cat) => (
          <div
            key={cat}
            className={`appointment-tab-btn ${selectedCategory === cat ? 'appointment-active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="appointment-main">
        <div className="appointment-service-list">
          <h3 className="sev-heading">{selectedCategory}</h3>
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`appointment-card ${selectedServices.some((item) => item.id === service.id) ? 'selected-card' : ''}`}
              onClick={() => handleCardClick(service)}
            >
              <div>
                <h4 className="seva-heading">{service.name}</h4>
                <p className="seva-para">{service.duration}</p>
                <p className="seava-para1">BHD {service.price}</p>
              </div>
              <div
                className="appointment-plus"
                onClick={(e) => handlePlusClick(service, e)}
              >
                {selectedServices.some((item) => item.id === service.id) ? '✅' : '➕'}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="appointment-summary-container">
          <div className="appointment-summary">
            <h3 className="summary-heading">Summary</h3>
            {selectedServices.length === 0 ? (
              <p className="summary-para">No services selected</p>
            ) : (
              <>
                {selectedServices.map((service, index) => (
                  <div key={index} className="appointment-summary-item">
                    <p className="item-para">{service.name}</p>
                    <p className="item-para1">BHD {service.price}</p>
                  </div>
                ))}
                <p className="item-para2">Total: BHD {totalPrice}</p>
              </>
            )}
            <button 
              className="appointment-continue-btn"
              onClick={handleContinue}
              disabled={selectedServices.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Modal Section */}
      {modalService && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={closeModal}>✖</button>
            <h2 className="modal-heading">{modalService.name}</h2>
            <p className="modal-para">{modalService.duration}</p>
            <p className="modal-para2">BHD {modalService.price}</p>
            <button className="button-click" onClick={(e) => handlePlusClick(modalService, e)}>
              {selectedServices.some((item) => item.id === modalService.id) ? 'Remove from Booking' : 'Add to Booking'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;

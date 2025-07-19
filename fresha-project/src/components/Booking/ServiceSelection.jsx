import React, { useState, useEffect } from "react";
import { Card, Tabs, Button } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "./ServiceSelection.css";
import Navbar from "../Navbar/Navbar";

export default function ServiceSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const { business, selectedService, selectedServices: preSelectedServices, selectedProfessional } = location.state || {};
  console.log("Selected Professional:", selectedProfessional);

  const [selectedServices, setSelectedServices] = useState(preSelectedServices || []);
  const [activeTab, setActiveTab] = useState("Featured");
  const [serviceTabs, setServiceTabs] = useState({});
  const [serviceCategoryMap, setServiceCategoryMap] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!business?.id) return;

    const fetchData = async () => {
      try {
        const [servicesRes, typesRes] = await Promise.all([
          axios.get(`https://glowhaus-full-stack.onrender.com/api/service/business/${business.id}`),
          axios.get(`https://glowhaus-full-stack.onrender.com/api/service-type/business/${business.id}`),
        ]);

        const services = servicesRes.data;
        console.log("Fetched services:", services);
        const serviceTypes = typesRes.data;
        console.log("Fetched service types:", serviceTypes);

        const typeMap = {};
    serviceTypes.forEach((type) => {
      typeMap[type.id] = type.service_type;
    });

        const categorized = {};
        const idToCategory = {};
        console.log("Categorized services:", categorized);
        console.log("ID to category mapping:", idToCategory);
        const featuredServices = [];

        services.forEach((service) => {
          const categoryName = typeMap[service.service_type_id];
          const formatted = {
            id: service.id,
            title: service.service_name,
            duration: service.duration,
            price: service.price,
            discount: service.discount || null,
          };

          if (!categorized[categoryName]) {
            categorized[categoryName] = [];
          }
          categorized[categoryName].push(formatted);
          featuredServices.push(formatted);
          idToCategory[service.id] = categoryName;
        });

        categorized["Featured"] = featuredServices;

        setServiceTabs(categorized);
        setServiceCategoryMap(idToCategory);

        // If coming from a preselected service
        if (selectedService) {
          const formatted = {
            id: selectedService.id,
            title: selectedService.service_name,
            duration: selectedService.duration,
            price: selectedService.price,
            discount: selectedService.discount || null,
          };
          setSelectedServices([formatted]);
          const tabKey = idToCategory[selectedService.id];
          setActiveTab(tabKey || "Featured");
        } else if (preSelectedServices?.length) {
          setSelectedServices(preSelectedServices);
          const lastService = preSelectedServices[preSelectedServices.length - 1];
          const tabKey = idToCategory[lastService.id];
          setActiveTab(tabKey || "Featured");
        }        
      } catch (err) {
        console.error("Failed to fetch services or service types", err);
      }
    };

    fetchData();
  }, [business?.id, selectedService]);

  const toggleService = (service) => {
    const exists = selectedServices.find((s) => s.id === service.id);
    if (exists) {
      setSelectedServices((prev) => prev.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices((prev) => [...prev, service]);

      const category = serviceCategoryMap[service.id];
      if (category && category !== activeTab) {
        setActiveTab(category);
      }
    }
  };

  const renderServiceCards = (services) => {
    if (!services || services.length === 0) {
      return <p>No services available in this category</p>;
    }

    return services.map((service, index) => {
      const isSelected = selectedServices.some((s) => s.id === service.id);
      return (
        <Card key={index} className={`service-card ${isSelected ? "selected" : ""}`}>
          <div className="service-info">
            <div>
              <h3>{service.title}</h3>
              <p>{service.duration}</p>
              <p>
                from BHD {service.price}
                {service.discount && <span className="discount"> • {service.discount}</span>}
              </p>
            </div>
            <Button
              shape="circle"
              icon={isSelected ? <CheckOutlined /> : <PlusOutlined />}
              onClick={() => toggleService(service)}
            />
          </div>
        </Card>
      );
    });
  };

  const handleContinue = () => {
    console.log("Navigating with selectedProfessional:", selectedProfessional);
    navigate(`/business/${business.slug}/professional`, {
      state: {
        selectedServices,
        selectedProfessional,
        business,
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="booking-container">
        <div className="breadcrumb">
          <span className="clickable" onClick={() => navigate(`/business/${business.slug}/services`, { state: { business, selectedServices, selectedProfessional } })}>
            Services
          </span>
          <span>›</span>
          <span
            className={selectedServices.length ? "clickable" : "disabled"}
            onClick={() => {
              if (selectedServices.length) {
                navigate(`/business/${business.slug}/professional`, {
                  state: { selectedServices, selectedProfessional, business },
                });
              }
            }}
          >
            Professional
          </span>
          <span>›</span>
          <span className="disabled">Time</span>
        </div>

        <div className="left-section">
          <h2 className="section-title">Select services</h2>
          <Tabs activeKey={activeTab} onChange={setActiveTab}>
            {["Featured", ...Object.keys(serviceTabs).filter((key) => key !== "Featured")].map(
              (tabKey) => (
                <Tabs.TabPane tab={tabKey} key={tabKey}>
                  {renderServiceCards(serviceTabs[tabKey])}
                </Tabs.TabPane>
              )
            )}
          </Tabs>
        </div>

        <div className="right-section">
          <Card className="summary-card">
            <div className="summary-header">
              <img
                src={
                  business?.main_image
                    ? `https://glowhaus-full-stack.onrender.com${business.main_image}`
                    : "https://via.placeholder.com/60"
                }
                alt="Salon"
                className="salon-img"
              />
              <div>
                <h3>{business?.name || "Selected Business"}</h3>
                <p>⭐ {business?.average_rating || 0} ({business?.total_reviews || 0})</p>
                <p className="location">{business?.address || "No address"}</p>
              </div>
            </div>

            {selectedServices.length > 0 ? (
              <div className="summary-body">
                {selectedServices.map((s, i) => (
                  <p key={i}>{s.title} - BHD {s.price}</p>
                ))}
              </div>
            ) : (
              <p>No services selected</p>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>
                {selectedServices.length
                  ? `BHD ${selectedServices.reduce((sum, s) => sum + s.price, 0)}`
                  : "Free"}
              </span>
            </div>

            <Button
              type="primary"
              className="continue-btn"
              disabled={selectedServices.length === 0}
              onClick={handleContinue}
            >
              Continue
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}

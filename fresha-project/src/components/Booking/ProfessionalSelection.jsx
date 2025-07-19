import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ProfessionalSelection.css";
import Navbar from "../Navbar/Navbar";

export default function ProfessionalSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedServices, business, selectedProfessional: initialProfessional } = location.state || {}; 
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(initialProfessional || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (business?.id) {  
      const fetchTeam = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://glowhaus-full-stack.onrender.com/api/team/business/${business.id}`);  // Use `business.id`
          console.log("API response: ", response.data);
          if (Array.isArray(response.data) && response.data.length > 0) {
            setTeamMembers(response.data);
          } else {
            setTeamMembers([]); // If no team members are found, set to empty
          }
        } catch (error) {
          console.error("Error fetching team data:", error);
          setTeamMembers([]); // If there's an error, set to empty
        } finally {
          setLoading(false);
        }
      };

      fetchTeam();
    }
  }, [business]);

  const handleSelect = (professional) => {
    setSelectedProfessional(professional);
  };

  const handleContinue = () => {
    // If no professionals are available, show a warning but still allow continuing
    if (teamMembers.length === 0) {
      message.warning("No professionals available. You can still proceed with your booking.");
    }

    navigate(`/business/${business.slug}/time`, {  // Use `business.slug`
      state: {
        selectedProfessional: selectedProfessional || null,  // Allow null for no professional selected
        selectedServices,
        business,  // Pass business details
      },
    });
  };

  // Placeholder professional when no team members are found
  const placeholderProfessional = {
    id: "placeholder",
    team_name: "Any Professional",
    role: "N/A",
    rating: 0,
    photo: "uploads/default.jpg", 
  };

  return (
    <>
      <Navbar />
      <div className="professional-selection-container">
        <div className="breadcrumb">
          <span
            className="clickable"
            onClick={() =>
              navigate(`/business/${business.slug}/selection`, {  
                state: {
                  selectedServices,
                  business,  
                },
              })
            }
          >
            Services
          </span>
          <span>›</span>
          <span className="active">Professional</span>
          <span>›</span>
          <span className="disabled">Time</span>
        </div>

        <div className="left-section">
          <h2 className="section-title">Select professional</h2>
          {loading ? (
            <p>Loading professionals...</p>
          ) : (
            <div className="professional-list">
              {/* Render team members or placeholder */}
              {(teamMembers.length > 0 ? teamMembers : [placeholderProfessional]).map((member) => (
                <Card
                  key={member.id}
                  className={`professional-card ${selectedProfessional?.id === member.id ? "selected" : ""}`}
                  onClick={() => handleSelect(member)}
                >
                  <div className="professional-info">
                    <img
                      src={`https://glowhaus-full-stack.onrender.com/${member.photo || "uploads/default.jpg"}`}
                      alt={member.team_name}
                      className="professional-img"
                    />
                    <h4>{member.team_name}</h4>
                    <p>{member.role}</p>
                    <p>⭐ {member.rating}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="right-section">
          <Card className="summary-card">
            <div className="summary-header">
              <img
                src={business?.main_image ? `https://glowhaus-full-stack.onrender.com${business.main_image}` : "https://via.placeholder.com/60"}
                alt="Salon"
                className="salon-img"
              />
              <div>
                <h3>{business?.name || "Selected Business"}</h3>
                {/* Display avg_rating and total_reviews */}
                <p>
                  ⭐ {business?.average_rating || 0} ({business?.total_reviews || 0})
                </p>
                <p className="location">{business?.address || "No address"}</p>  
              </div>
            </div>

            {selectedServices?.length > 0 ? (
              <div className="summary-body">
                {selectedServices.map((service, index) => (
                  <p key={index}>{service.title} - BHD {service.price}</p>
                ))}
              </div>
            ) : (
              <p>No services selected</p>
            )}

            {selectedProfessional ? (
              <div className="summary-body">
                <p><strong>Professional:</strong> {selectedProfessional.team_name}</p>
                <p><strong>Role:</strong> {selectedProfessional.role}</p>
                <p><strong>Rating:</strong> ⭐ {selectedProfessional.rating}</p>
              </div>
            ) : (
              <p>No professional selected</p>
            )}

            <div className="summary-total">
              <span>Total</span>
              <span>
                {selectedServices?.length > 0
                  ? `BHD ${selectedServices.reduce((sum, s) => sum + s.price, 0)}`
                  : "Free"}
              </span>
            </div>

            <Button
              type="primary"
              className="continue-btn"
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

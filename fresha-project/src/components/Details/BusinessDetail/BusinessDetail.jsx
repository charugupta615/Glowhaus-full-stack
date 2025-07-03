import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './BusinessDetail.css';
import Navbar from '../../Navbar/Navbar';
import StoreLayout from '../../Layout/StoreLayout';
import Locations from '../Locations/Locations';
import VenuesNearby from '../VenuesNearby/VenuesNearby';
import Footer from '../../Footer/Footer';
import Services from '../Services/Services';
import Teams from '../Teams/Teams';
import FeedBack from '../FeedBack/FeedBack';
import { BsBoxArrowUp } from 'react-icons/bs';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { message } from 'antd';

const BusinessDetail = () => {
  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [team, setTeam] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { slug } = useParams();
  console.log('Slug from URL:', slug);
  const customerId = localStorage.getItem('customerId');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBusinessData();
  }, [slug]);

  const fetchBusinessData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/business/display/slug/${slug}`);
      setBusiness(res.data.business);
      setServices(res.data.services);
      setTeam(res.data.team);
      setReviews(res.data.reviews);

      if (customerId && res.data?.business?.id) {
        const { data: favData } = await axios.get(`http://localhost:5000/api/favorites/display/${customerId}`);
        const isFav = favData.some((fav) => fav.business.id === res.data.business.id);
        setIsFavorite(isFav);
      }
    } catch (error) {
      console.error('Failed to fetch business data:', error);
    }
  };

  const toggleFavorite = async () => {
    if (!customerId) {
      return message.warning('Please log in to manage favorites');
    }

    const endpoint = isFavorite
      ? 'http://localhost:5000/api/favorites/remove'
      : 'http://localhost:5000/api/favorites/add';
    const method = isFavorite ? 'DELETE' : 'POST';

    try {
      const response = await axios({
        method,
        url: endpoint,
        headers: { 'Content-Type': 'application/json' },
        ...(method === 'DELETE'
          ? { data: { customer_id: customerId, business_id: business.id } }
          : { data: { customer_id: customerId, business_id: business.id } }),
      });

      if (response.data.success || response.data.message) {
        setIsFavorite(!isFavorite); // Toggle after successful response
        message.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
      } else {
        message.error(response.data.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      message.error('Failed to update favorite');
    }
  };

  const handleSeeAllImages = () => {
    navigate(`/business/${business.id}/images`);
  };

  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return totalRating / reviews.length;
  };

  if (!business) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="store-detail-container1">
        <div className="store-info1">
          <div className="store-header1">
            <h1 className="store-heading1">{business.name}</h1>
            <div className="store-icons1">
              <BsBoxArrowUp className="icon" />
              <span className="icon" onClick={toggleFavorite}>
                {isFavorite ? (
                  <HeartFilled style={{ color: 'red', fontSize: '24px' }} />
                ) : (
                  <HeartOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
                )}
              </span>
            </div>
          </div>

          <div className="rating1">
            <span className="rating-score">
              <i className="fa fa-star" style={{ color: 'gold', marginRight: '5px' }}></i>
              {calculateAverageRating().toFixed(1)}
            </span>
            <span className="rating-count">({reviews.length})</span>
            {/* <span className="status"> • {business.status || 'Unknown'}</span> */}
            <span className="location"> • {business.address || 'Unknown'}</span>
            <a href="#" className="directions">Get directions</a>
          </div>
        </div>

        <div className="images-section">
          <img
            src={`http://localhost:5000${business.main_image}`}
            alt="Main"
            className="main-image"
            onClick={handleSeeAllImages}
          />
          <div className="sub-images">
            <img
              src={`http://localhost:5000${business.side_image}`}
              alt="Side View"
              onClick={handleSeeAllImages}
            />
            <div className="see-all-container">
              <img
                src={`http://localhost:5000${business.side_image1}`}
                alt="Side View 2"
                onClick={handleSeeAllImages}
              />
              {/* <button className="see-all-btn1" onClick={handleSeeAllImages}>
                See All Images
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <StoreLayout
        slug={slug}
        servicesComponent={<Services servicesData={services} teamData={team} businessData={business} />}
        teamsComponent={<Teams teamData={team} />}
        feedbackComponent={<FeedBack reviews={reviews} />}
      />
      <Locations />
      <VenuesNearby />
      <Footer />
    </>
  );
};

export default BusinessDetail;

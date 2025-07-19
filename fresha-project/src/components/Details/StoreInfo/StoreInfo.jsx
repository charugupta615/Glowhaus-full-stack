import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Spin, Alert } from 'antd';
import { StarFilled, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './StoreInfo.css';

const StoreInfo = ({ slug }) => {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    axios.get(`https://glowhaus-full-stack.onrender.com/api/business/display/slug/${slug}`)
      .then((res) => {
        console.log("Fetched business:", res.data.business);
        setStore(res.data.business);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Store fetch error:', err);
        setError('Failed to load business details');
        setLoading(false);
      });
  }, [slug]);

  const handleBookNow = () => {
    if (store) {
      navigate(`/a/${store.slug}/all-offer?venue=true`);
    }
  };

  if (loading) return <Spin tip="Loading store..." />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <Card className="store-card">
      <h2 className="store-heading">{store.name}</h2>
      <div className="rating-section">
        <span>{store.average_rating}</span>
        {[...Array(5)].map((_, i) => (
          <StarFilled key={i} className="star-icon" />
        ))}
        <span className="reviews">({store.total_reviews})</span>
      </div>
      {store.is_featured && <Tag color="gold">Featured</Tag>}

      <Button type="primary" block className="book-now1" onClick={handleBookNow}>Book Now</Button>

      <div className="store-address">
        <EnvironmentOutlined className="address-icon" />
        <span>{store.address}</span>
      </div>
    </Card>
  );
};

export default StoreInfo;

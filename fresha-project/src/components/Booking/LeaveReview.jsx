import React, { useState, useEffect } from 'react';
import { Input, Rate, Button, message } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function LeaveReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { businessId } = location.state || {};

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!businessId) {
      message.error('Invalid business ID');
      navigate('/');
    }
  }, [businessId, navigate]);

  const handleSubmit = async () => {
    console.log('businessId type:', typeof businessId);
    if (!rating || !customerName.trim()) {
      message.warning('Please provide your name and a rating');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('https://glowhaus-full-stack.onrender.com/api/reviews/add', {
        business_id: businessId,
        customer_name: customerName.trim(),
        rating,
        comment: comment.trim(),
      });

      if (res.data.message) {
        message.success('Review submitted successfully!');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      message.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h2>Leave a Review</h2>
      <Input
        placeholder="Your Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Rate
        value={rating}
        onChange={setRating}
        style={{ marginBottom: 12 }}
      />
      <Input.TextArea
        rows={4}
        placeholder="Your feedback"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ marginBottom: 12 }}
      />
      <Button
        type="primary"
        onClick={handleSubmit}
        loading={loading}
        disabled={loading}
      >
        Submit Review
      </Button>
    </div>
  );
}

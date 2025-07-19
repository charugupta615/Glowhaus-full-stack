import './styles/antd.css';
import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Tag, Select } from 'antd';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [businessFilter, setBusinessFilter] = useState('all');
  const [businesses, setBusinesses] = useState([]);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get('https://glowhaus-full-stack.onrender.com/api/business/display');
      if (response.data && Array.isArray(response.data)) {
        setBusinesses(response.data);
      } else {
        message.error('No businesses found.');
      }
    } catch (error) {
      console.error('Error fetching businesses:', error);
      message.error('Failed to load businesses.');
    }
  };

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://glowhaus-full-stack.onrender.com/api/booking/admin/all');
      const formattedData = Array.isArray(response.data.bookings)
        ? response.data.bookings.map((booking, index) => ({
            key: index,
            client: booking.customer_name || `Customer ${booking.customer_id}`,
            business: booking.business?.name || 'N/A',
            businessId: booking.business?.id, 
            services: Array.isArray(booking.services)
              ? booking.services.map(service => service.service_name).join(', ')
              : 'N/A',
            date: booking.selected_date
              ? new Date(booking.selected_date).toLocaleDateString()
              : 'N/A',
            time: booking.time || 'N/A',
            team: booking.team?.team_name || 'N/A',
            status: booking.status || 'pending',
          }))
        : [];

      setBookings(formattedData);
      setFilteredBookings(formattedData); 
    } catch (error) {
      console.error('Error fetching bookings:', error);
      message.error('Failed to load bookings.');
    }
    setLoading(false);
  };

  
  const handleBusinessFilterChange = (value) => {
    setBusinessFilter(value);
    if (value === 'all') {
      setFilteredBookings(bookings); 
    } else {
      setFilteredBookings(bookings.filter(booking => booking.businessId === Number(value))); 
    }
  };

  // Map business options for Select dropdown
  const businessOptions = businesses.map(businessObj => ({
    label: businessObj.business.name, 
    value: businessObj.business.id.toString(), 
  }));

  // Table columns definition
  const columns = [
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Business Booked',
      dataIndex: 'business',
      key: 'business',
    },
    {
      title: 'Services',
      dataIndex: 'services',
      key: 'services',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Professional',
      dataIndex: 'team',
      key: 'team',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'cancelled') color = 'red';
        else if (status === 'pending') color = 'orange';
        else if (status === 'confirmed') color = 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  // Initial load
  useEffect(() => {
    fetchBusinesses();
    fetchBookings();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Select
          placeholder={businessOptions.length > 0 ? 'Select Business' : 'No businesses available'}
          style={{ width: 250 }}
          onChange={handleBusinessFilterChange}
          value={businessFilter}
          options={[{ label: 'All Businesses', value: 'all' }, ...businessOptions]}
          disabled={businessOptions.length === 0}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredBookings} 
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default Bookings;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Image, Typography, Spin, Row, Col, Divider, Tag } from 'antd';
import axios from 'axios';

const { Title, Paragraph, Text } = Typography;

const BusinessDetail = () => {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://glowhaus-full-stack.onrender.com/api/business/display/${id}`);
        setBusiness(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching business details:', error);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;

  if (!business) return <p>No business found.</p>;

  const { business: biz, services, team } = business;

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Image
              src={`https://glowhaus-full-stack.onrender.com${biz.main_image}`}
              alt={biz.name}
              style={{ borderRadius: '12px' }}
              width="100%"
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={2}>{biz.name}</Title>
            <Paragraph><Text strong>Address:</Text> {biz.address}</Paragraph>
            <Paragraph>
              <Text strong>Rating:</Text> {biz.average_rating?.toFixed(1)}{' '}
              <Tag color="gold">★</Tag>
            </Paragraph>
            <Paragraph><Text strong>Votes:</Text> {biz.total_reviews}</Paragraph>
            <Paragraph>
              <Text strong>Status:</Text>{' '}
              <Tag color={biz.status === 'active' ? 'green' : 'red'}>
                {biz.status.toUpperCase()}
              </Tag>
            </Paragraph>
          </Col>
        </Row>
      </Card>

      <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Services</Divider>

      <Row gutter={[16, 16]}>
        {services.map((type) => (
          <Col xs={24} sm={24} md={24} key={type.service_type}>
            <Card title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{type.service_type}</span>} bordered={false} style={{ marginBottom: 16 }}>
              <Row gutter={[16, 16]}>
                {type.services.map((srv) => (
                  <Col xs={24} sm={12} md={8} key={srv.id}>
                    <Card bordered style={{ textAlign: 'center' }}>
                    <Title level={5} style={{ fontSize: '18px' }}>{srv.service_name}</Title>
                      <Paragraph>₹{srv.price} — {srv.duration}</Paragraph>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Our Team</Divider>

      <Row gutter={[16, 16]}>
        {team.map((member) => (
          <Col xs={24} sm={12} md={8} key={member.id}>
            <Card bordered>
              <Title level={5}>{member.team_name}</Title>
              <Paragraph><Text type="secondary">{member.role}</Text></Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BusinessDetail;

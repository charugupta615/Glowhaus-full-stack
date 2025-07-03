// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, Image, Typography, Spin, Row, Col, Divider, Tag, Table } from "antd";
// import axiosInstance from "./utils/axiosInstance";

// const { Title, Paragraph, Text } = Typography;

// const BusinessDashboard = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const token = localStorage.getItem("businessToken");
//   const businessName = localStorage.getItem("businessName");

//   useEffect(() => {
//     const id = localStorage.getItem("businessId");

//     if (!token || !id) {
//       navigate("/business/login");
//     } else {
//       axiosInstance
//         .get(`/business/display/${id}`)
//         .then((res) => {
//             console.log("Business data:", res.data);
//           setData(res.data);
//         })
//         .catch(() => {
//           localStorage.clear();
//           navigate("/business/login");
//         });
//     }
//   }, [navigate, token]);

//   if (!data) {
//     return <div style={{ textAlign: "center", marginTop: 100 }}><Spin size="large" /></div>;
//   }

//   const { business: biz, services, team, bookings = [] } = data;

//   return (
//     <div style={{ padding: '24px' }}>
//       <Card bordered={false}>
//         <Row gutter={[24, 24]}>
//           <Col xs={24} sm={8}>
//             <Image
//               src={`http://localhost:5000${biz.main_image}`}
//               alt={biz.name}
//               style={{ borderRadius: '12px' }}
//               width="100%"
//             />
//           </Col>
//           <Col xs={24} sm={16}>
//             <Title level={2}>{businessName || biz?.name}</Title>
//             <Paragraph><Text strong>Address:</Text> {biz.address}</Paragraph>
//             <Paragraph><Text strong>Email:</Text> {biz.email}</Paragraph>
//             <Paragraph><Text strong>Rating:</Text> {biz.average_rating?.toFixed(1)} <Tag color="gold">★</Tag></Paragraph>
//             <Paragraph><Text strong>Votes:</Text> {biz.total_reviews}</Paragraph>
//             <Paragraph>
//               <Text strong>Status:</Text>{' '}
//               <Tag color={biz.status === 'active' ? 'green' : 'red'}>
//                 {biz.status.toUpperCase()}
//               </Tag>
//             </Paragraph>
//           </Col>
//         </Row>
//       </Card>

//       <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Services</Divider>

//       <Row gutter={[16, 16]}>
//         {services.map((type) => (
//           <Col xs={24} key={type.service_type}>
//             <Card title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{type.service_type}</span>} bordered={false}>
//               <Row gutter={[16, 16]}>
//                 {type.services.map((srv) => (
//                   <Col xs={24} sm={12} md={8} key={srv.id}>
//                     <Card bordered style={{ textAlign: 'center' }}>
//                       <Title level={5} style={{ fontSize: '18px' }}>{srv.service_name}</Title>
//                       <Paragraph>₹{srv.price} — {srv.duration}</Paragraph>
//                     </Card>
//                   </Col>
//                 ))}
//               </Row>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Our Team</Divider>

//       <Row gutter={[16, 16]}>
//         {team.map((member) => (
//           <Col xs={24} sm={12} md={8} key={member.id}>
//             <Card bordered>
//               <Title level={5}>{member.team_name}</Title>
//               <Paragraph><Text type="secondary">{member.role}</Text></Paragraph>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Bookings</Divider>

//       {bookings.length === 0 ? (
//         <p>No bookings yet.</p>
//       ) : (
//         <Table
//   bordered
//   dataSource={bookings}
//   rowKey="booking_id"
//   pagination={{ pageSize: 5 }}
//   columns={[
//     {
//       title: "Booking ID",
//       dataIndex: "booking_id",
//       key: "booking_id",
//     },
//     {
//       title: "Customer",
//       dataIndex: "customer_name",
//       key: "customer_name",
//     },
//     {
//       title: "Service",
//       key: "services",
//       render: (text, record) => (
//         <span>{record.services.map(service => service.service_name).join(", ")}</span>
//         // Join service names in a comma-separated list if there are multiple services
//       ),
//     },
//     {
//       title: "Date",
//       dataIndex: "selected_date",
//       key: "selected_date",
//       render: (text) => new Date(text).toLocaleDateString(),
//     },
//     {
//       title: "Time",
//       dataIndex: "time", 
//       key: "time",
//     },
//   ]}
// />

//       )}
//     </div>
//   );
// };

// export default BusinessDashboard;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Image, Typography, Spin, Row, Col, Divider, Tag, Table } from "antd";
import axiosInstance from "./utils/axiosInstance";

const { Title, Paragraph, Text } = Typography;

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const token = localStorage.getItem("businessToken");
  const businessName = localStorage.getItem("businessName");

  useEffect(() => {
    const id = localStorage.getItem("businessId");

    if (!token || !id) {
      navigate("/business/login");
    } else {
      axiosInstance
        .get(`/business/display/${id}`)
        .then((res) => {
          console.log("Business data:", res.data);
          setData(res.data);
        })
        .catch(() => {
          localStorage.clear();
          navigate("/business/login");
        });
    }
  }, [navigate, token]);

  if (!data) {
    return <div style={{ textAlign: "center", marginTop: 100 }}><Spin size="large" /></div>;
  }

  const { business: biz, services, team, bookings = [] } = data;

  return (
    <div style={{ padding: '24px' }}>
      <Card bordered={false}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <Image
              src={`http://localhost:5000${biz.main_image}`}
              alt={biz.name}
              style={{ borderRadius: '12px' }}
              width="100%"
            />
          </Col>
          <Col xs={24} sm={16}>
            <Title level={2}>{businessName || biz?.name}</Title>
            <Paragraph><Text strong>Address:</Text> {biz.address}</Paragraph>
            <Paragraph><Text strong>Email:</Text> {biz.email}</Paragraph>
            <Paragraph><Text strong>Rating:</Text> {biz.average_rating?.toFixed(1)} <Tag color="gold">★</Tag></Paragraph>
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
          <Col xs={24} key={type.service_type}>
            <Card title={<span style={{ fontSize: '18px', fontWeight: 'bold' }}>{type.service_type}</span>} bordered={false}>
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

      <Divider orientation="center" style={{ fontSize: '30px', fontWeight: 'bold' }}>Bookings</Divider>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <Table
          bordered
          dataSource={bookings}
          rowKey="booking_id"
          pagination={{ pageSize: 5 }}
          columns={[
            {
              title: "Booking ID",
              dataIndex: "booking_id",
              key: "booking_id",
              sorter: (a, b) => a.booking_id - b.booking_id,
            },
            {
              title: "Customer",
              dataIndex: "customer_name",
              key: "customer_name",
              sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
            },
            {
              title: "Service",
              key: "services",
              render: (_, record) => (
                <span>{record.services.map(service => service.service_name).join(", ")}</span>
              ),
            },
            {
              title: "Date",
              dataIndex: "selected_date",
              key: "selected_date",
              render: (text) => new Date(text).toLocaleDateString(),
              sorter: (a, b) => new Date(a.selected_date) - new Date(b.selected_date),
            },
            {
              title: "Time",
              dataIndex: "time",
              key: "time",
              sorter: (a, b) => a.time.localeCompare(b.time),
            },
          ]}
        />
      )}
    </div>
  );
};

export default BusinessDashboard;

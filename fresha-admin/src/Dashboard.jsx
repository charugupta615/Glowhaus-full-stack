import React from 'react';
import StatCard from './StatCard';
import RevenueChart from './RevenueChart';
import './styles/Dashboard.css';
import { 
  Users, 
  Book, 
  Layers, 
  Package, 
  ChevronRight,
} from 'lucide-react';
import './styles/App.css';

function Dashboard() {
  return (
    <div className="app">
      <main className="main-container">
        <div className="stats-grid">
          <StatCard
            title="Customers"
            value="1,254"
            icon={Users}
            change={{ value: "4.3%", positive: true }}
            timeframe="Since last month"
          />
          <StatCard
            title="Bookings"
            value="3,843"
            icon={Book}
            change={{ value: "2.1%", positive: true }}
            timeframe="Since last month"
          />
          <StatCard
            title="Services"
            value="86"
            icon={Package}
            change={{ value: "1.5%", positive: false }}
            timeframe="Since last month"
          />
          <StatCard
            title="Service Types"
            value="12"
            icon={Layers}
            change={{ value: "6.8%", positive: true }}
            timeframe="Since last month"
          />
        </div>
        

        <div className="charts-grid">
          <RevenueChart />
          
          <div className="recent-activity">
            <div className="recent-activity-header">
              <h3 className="recent-activity-title">Recent Activity</h3>
              <button className="view-all-button">
                View All
                <ChevronRight />
              </button>
            </div>
            <div className="activity-list">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-icon">
                    <Users />
                  </div>
                  <div className="activity-content">
                    <h4>New customer registered</h4>
                    <p className="activity-time">{i + 1} minutes ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;






// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card, Statistic, Table, message } from 'antd';
// import { TeamOutlined, BookOutlined, AppstoreOutlined, UserOutlined, ClusterOutlined } from '@ant-design/icons';
// import axios from 'axios';
// import { Bar } from '@ant-design/charts';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     customers: 0,
//     bookings: 0,
//     teams: 0,
//     serviceTypes: 0,
//     services: 0,
//   });
//   const [bookingData, setBookingData] = useState([]);
//   const [activities, setActivities] = useState([]);

//   useEffect(() => {
//     fetchStats();
//     fetchChartData();
//     fetchRecentActivities();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/admin/stats'); // You’ll need to create this endpoint
//       setStats(res.data);
//     } catch {
//       message.error('Failed to fetch stats');
//     }
//   };

//   const fetchChartData = async () => {
//     try {
//       const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/bookings/chart-data'); // You’ll need to create this endpoint
//       setBookingData(res.data);
//     } catch {
//       message.error('Failed to fetch chart data');
//     }
//   };

//   const fetchRecentActivities = async () => {
//     try {
//       const res = await axios.get('https://glowhaus-full-stack.onrender.com/api/admin/recent-activities'); // Custom endpoint
//       setActivities(res.data);
//     } catch {
//       message.error('Failed to fetch recent activities');
//     }
//   };

//   const chartConfig = {
//     data: bookingData,
//     xField: 'date',
//     yField: 'count',
//     seriesField: 'type',
//     color: ['#5B8FF9'],
//     height: 300,
//     autoFit: true,
//   };

//   const activityColumns = [
//     { title: 'Activity', dataIndex: 'activity', key: 'activity' },
//     { title: 'Date', dataIndex: 'date', key: 'date' },
//   ];

//   return (
//     <div>
//       <Row gutter={[16, 16]}>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Customers" value={stats.customers} prefix={<UserOutlined />} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Bookings" value={stats.bookings} prefix={<BookOutlined />} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Teams" value={stats.teams} prefix={<TeamOutlined />} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Service Types" value={stats.serviceTypes} prefix={<AppstoreOutlined />} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Services" value={stats.services} prefix={<ClusterOutlined />} />
//           </Card>
//         </Col>
//       </Row>

//       <Card title="Bookings Over Time" style={{ marginTop: 24 }}>
//         <Bar {...chartConfig} />
//       </Card>

//       <Card title="Recent Activities" style={{ marginTop: 24 }}>
//         <Table columns={activityColumns} dataSource={activities} rowKey="id" />
//       </Card>
//     </div>
//   );
// };

// export default AdminDashboard;

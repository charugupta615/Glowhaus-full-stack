// import { useEffect } from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from 'react-router-dom';

// import Layout from './Layout';
// import Dashboard from './Dashboard';
// import AdminLogin from './AdminLogin';
// import Clients from './Clients';
// import Calendar from './Calendar';
// import Bookings from './Bookings';
// import Teams from './Teams';
// import Settings from './Settings';
// import BusinessTable from './BusinessTable';
// import BusinessDetail from './BusinessDetail';
// import Services from './Services';

// function App() {
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'light';
//     document.documentElement.setAttribute('data-theme', savedTheme);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/business" element={<BusinessTable />} />
//           <Route path="/business/:id" element={<BusinessDetail />} />
//           <Route path="/clients" element={<Clients />} />
//           <Route path="/calendar" element={<Calendar />} />
//           <Route path="/bookings" element={<Bookings />} />
//           <Route path="/teams" element={<Teams />} />
//           <Route path="/settings" element={<Settings />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './Layout';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import Calendar from './Calendar';
import Bookings from './Bookings';
import Teams from './Teams';
import Settings from './Settings';
import BusinessTable from './BusinessTable';
import BusinessDetail from './BusinessDetail';
import Services from './Services';
import BusinessLogin from "./BusinessLogin";
import BusinessDashboard from "./BusinessDashboard";

import AdminPrivateRoute from './AdminPrivateRoute';

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/"
          element={
            <AdminPrivateRoute>
              <Layout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/business" element={<BusinessTable />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/dashboard" element={<BusinessDashboard />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;

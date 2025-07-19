// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import profileImg from '../../../assets/images/default-avatar.png';
// import AccountSection from '../AccountSection/AccountSection';
// import ChangePasswordSection from '../ChangePasswordSection/ChangePasswordSection';
// import BookingSection from '../BookingSection/BookingSection';
// import Navbar from '../../Navbar/Navbar';
// import './ProfilePage.css';


// const ProfilePage = () => {
//   const [activeTab, setActiveTab] = useState('account');
//   const [customerData, setCustomerData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     gender: '',
//     city: '',
//     date_of_birth: '',
//   });

//   useEffect(() => {
//     const fetchCustomer = async () => {
//       const token = localStorage.getItem('token');
//       const customerId = localStorage.getItem('customerId');

//       if (!customerId) {
//         window.location.href = '/login';
//         return;
//       }

//       try {
//         const response = await axios.get(`https://glowhaus-full-stack.onrender.com/api/customer/${customerId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = response.data;
//         setCustomerData({
//           name: data.name || '',
//           phone: data.phone || '',
//           email: data.email || '',
//           gender: data.gender || '',
//           city: data.city || '',
//           date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
//         });
//       } catch (err) {
//         console.error('Error fetching customer data:', err);
//       }
//     };

//     fetchCustomer();
//   }, []);

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'account':
//         return <AccountSection customerData={customerData} setCustomerData={setCustomerData} />;
//       case 'password':
//         return <ChangePasswordSection />;
//       case 'bookings':
//         return <BookingSection />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="profile-container">
//         <div className="profile-left">
//           <div className="profile-image1">
//             <img src={profileImg} alt="Profile" />
//             <h3>{customerData.name}</h3>
//           </div>
//           <div className="profile-tabs">
//             <button
//               className={activeTab === 'account' ? 'active' : ''}
//               onClick={() => setActiveTab('account')}
//             >
//               Account Info
//             </button>
//             <button
//               className={activeTab === 'password' ? 'active' : ''}
//               onClick={() => setActiveTab('password')}
//             >
//               Change Password
//             </button>
//             <button
//               className={activeTab === 'bookings' ? 'active' : ''}
//               onClick={() => setActiveTab('bookings')}
//             >
//               Bookings
//             </button>
//           </div>
//         </div>
//         <div className="profile-right">{renderContent()}</div>
//       </div>
//     </>
//   );
// };

// export default ProfilePage;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profileImg from '../../../assets/images/default-avatar.png';
import AccountSection from '../AccountSection/AccountSection';
import ChangePasswordSection from '../ChangePasswordSection/ChangePasswordSection';
import BookingSection from '../BookingSection/BookingSection';
import Navbar from '../../Navbar/Navbar';
import './ProfilePage.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'account');
  const [customerData, setCustomerData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    city: '',
    date_of_birth: '',
  });
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCustomer = async () => {
      const token = localStorage.getItem('token');
      const customerId = localStorage.getItem('customerId');

      if (!customerId) {
        window.location.href = '/login';
        return;
      }

      try {
        const response = await axios.get(`https://glowhaus-full-stack.onrender.com/api/customer/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data;
        setCustomerData({
          name: data.name || '',
          phone: data.phone || '',
          email: data.email || '',
          gender: data.gender || '',
          city: data.city || '',
          date_of_birth: data.date_of_birth ? data.date_of_birth.split('T')[0] : '',
        });
      } catch (err) {
        console.error('Error fetching customer data:', err);
        window.location.href = '/login'; 
      } finally {
        setLoading(false); 
      }
    };

    fetchCustomer();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    localStorage.removeItem('activeTab'); // Clear saved tab
    window.location.href = '/'; // Redirect to homepage
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'account':
        return <AccountSection customerData={customerData} setCustomerData={setCustomerData} />;
      case 'password':
        return <ChangePasswordSection />;
      case 'bookings':
        return <BookingSection />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-image1">
            <img src={profileImg} alt="Profile" />
            <h3>{customerData.name}</h3>
          </div>
          <div className="profile-tabs">
            <button
              className={activeTab === 'account' ? 'active' : ''}
              onClick={() => handleTabChange('account')}
            >
              Account Info
            </button>
            <button
              className={activeTab === 'password' ? 'active' : ''}
              onClick={() => handleTabChange('password')}
            >
              Change Password
            </button>
            <button
              className={activeTab === 'bookings' ? 'active' : ''}
              onClick={() => handleTabChange('bookings')}
            >
              Bookings
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="profile-right">{renderContent()}</div>
      </div>
    </>
  );
};

export default ProfilePage;

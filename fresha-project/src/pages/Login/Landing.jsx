// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { LeftOutlined } from '@ant-design/icons';

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Section */}
//       <div className="w-1/2 bg-white p-8">
//         <div className="max-w-md mx-auto">
//           <LeftOutlined className="mb-6 text-xl cursor-pointer" />
//           <h1 className="text-3xl font-bold mb-8">Sign up/log in</h1>

//           <div 
//             className="border rounded-lg p-6 mb-6 cursor-pointer hover:shadow-md transition"
//             onClick={() => navigate('/register')}
//           >
//             <h3 className="text-xl font-semibold">Fresha for customers</h3>
//             <p className="text-gray-600">Book salons and spas near you</p>
//           </div>

//           <div 
//             className="border rounded-lg p-6 cursor-pointer hover:shadow-md transition"
//             onClick={() => navigate('/login')}
//           >
//             <h3 className="text-xl font-semibold">Fresha for professionals</h3>
//             <p className="text-gray-600">Manage and grow your business</p>
//           </div>

//           <div className="mt-auto pt-8">
//             <p className="text-gray-600">English | Support</p>
//           </div>
//         </div>
//       </div>

//       {/* Right Section */}
//       <div 
//         className="w-1/2 bg-cover bg-center"
//         style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)' }}
//       ></div>
//     </div>
//   );
// };

// export default Landing;





import React from 'react';
import './Landing.css';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../assets/images/login-image.jpg'; 

const Landing = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="left-sec">
        <div className="login-content">
          <i className="fas fa-arrow-left back-arrow" onClick={goBack}></i>
          <h1 className="login-heading">Sign up/log in</h1>

          {/* Customer Login */}
          <div className="login-option" onClick={() => navigate('/register')}>
            <h3 className="log-heading">Glowhaus for customers</h3>
            <p className="log-para">Book salons and spas near you</p>
          </div>

          {/* Professional Login */}
          <div className="login-option" onClick={() => console.log('Professional Login')}>
            <h3 className="opt-heading">Glowhaus for professionals</h3>
            <p className="opt-para">Manage and grow your business</p>
          </div>

          <div className="footer-links1">
            <p className="fot-para">English | Support</p>
          </div>
        </div>
      </div>

      {/* Right Section with Background Image */}
      <div className="right-sec" style={{ backgroundImage: `url(${loginImage})` }}></div>
    </div>
  );
};

export default Landing;

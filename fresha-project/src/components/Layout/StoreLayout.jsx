// import React from 'react';
// import StoreInfo from '../Details/StoreInfo/StoreInfo';
// import AboutPage from '../Details/AboutPage/AboutPage';
// import './StoreLayout.css';

// const StoreLayout = ({ businessId, servicesComponent, teamsComponent, feedbackComponent }) => {
//   return (
//     <div className="store-layout">
//       {/* Left Section */}
//       <div className="content-section">
//         {servicesComponent}
//         {teamsComponent}
//         {feedbackComponent}
//         <AboutPage />
//       </div>

//       {/* Right Section (Fixed) */}
//       <div className="store-info-section">
//         {/* Pass businessId as a prop to StoreInfo */}
//         <StoreInfo businessId={businessId} />
//       </div>
//     </div>
//   );
// };

// export default StoreLayout;





import React from 'react';
import StoreInfo from '../Details/StoreInfo/StoreInfo';
import AboutPage from '../Details/AboutPage/AboutPage';
import './StoreLayout.css';

const StoreLayout = ({ slug, servicesComponent, teamsComponent, feedbackComponent }) => {
  return (
    <div className="store-layout">
      {/* Left Section */}
      <div className="content-section">
        {servicesComponent}
        {teamsComponent}
        {feedbackComponent}
        <AboutPage />
      </div>

      {/* Right Section (Fixed) */}
      <div className="store-info-section">
        {/* Pass slug as a prop to StoreInfo */}
        <StoreInfo slug={slug} />
      </div>
    </div>
  );
};

export default StoreLayout;


// import React, { useState, useEffect } from 'react';
// import { Outlet, useLocation } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import MobileMenu from './MobileMenu';
// import Header from './Header';
// import { Menu } from 'lucide-react';
// import './styles/Dashboard.css';
// import './styles/App.css';

// function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 425);
//   const location = useLocation();

//   // Listen for screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 425;
//       setIsMobile(mobile);
//       if (mobile) {
//         setIsSidebarOpen(false); // ensure sidebar is off for mobile
//       }
//     };

//     handleResize(); // trigger once on mount
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const routeTitles = {
//     '/': 'Dashboard',
//     '/business': 'Business',
//     '/calendar': 'Calendar',
//     '/bookings': 'Bookings',
//     '/teams': 'Teams',
//   };

//   const pageTitle = routeTitles[location.pathname];

//   return (
//     <div className="app">
//       {/* Show toggle button on desktop only */}
//       {!isMobile && (
//         <button
//           className={`toggle-button ${!isSidebarOpen ? 'left-collapsed' : ''}`}
//           onClick={toggleSidebar}
//         >
//           <Menu />
//         </button>
//       )}

//       {/* Sidebar for desktop */}
//       {!isMobile && <Sidebar isOpen={isSidebarOpen} />}

//       {/* Mobile Menu only on mobile */}
//       {isMobile && <MobileMenu />}

//       <div
//         className={`main-content ${
//           !isMobile && isSidebarOpen ? 'with-sidebar' : 'no-sidebar'
//         }`}
//       >
//         <header className="header">
//           <div className="header-container">
//             <div className="header-content">
//               <h1 className="header-title">{pageTitle}</h1>
//               <Header />
//             </div>
//           </div>
//         </header>

//         <main className="main-container">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Layout;



import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileMenu from './MobileMenu';
import Header from './Header';
import { Menu } from 'lucide-react';
import './styles/Layout.css'; 

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // auto collapse sidebar
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const routeTitles = {
    '/': 'Dashboard',
    '/business': 'Business',
    '/calendar': 'Calendar',
    '/bookings': 'Bookings',
    '/teams': 'Teams',
    '/services': 'Services',
  };

  const pageTitle = routeTitles[location.pathname] || '';

  return (
    <div className="layout-wrapper">
      {!isMobile && (
        <>
          <Sidebar isOpen={isSidebarOpen} />
          <button
            className="sidebar-toggle-btn"
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
        </>
      )}
      {isMobile && <MobileMenu />}

      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
        <header className="fixed-header">
          <div className="header-left">
          </div>
          <Header />
        </header>

        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;

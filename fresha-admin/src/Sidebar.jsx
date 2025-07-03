import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {
  LayoutDashboard,
  LineChart,
  UserCircle,
  Calendar,
  FileText,
  Users,
  BookOpen,
  Store,
  Building2, 
  Grid 
} from 'lucide-react';

import './styles/Sidebar.css';
import NavItem from './NavItem';
import NavSection from './NavSection';

function Sidebar({ isOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication tokens or session data
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage
    sessionStorage.clear(); // Clear session storage if needed

    // Redirect to the login page
    navigate('/admin/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="sidebar-logo-text">G</span>
        </div>
        {isOpen && <span className="sidebar-brand">Glowhaus</span>}
      </div>

      <div className="sidebar-content">
        <NavSection title="Navigation" isOpen={isOpen}>
          <NavItem
            icon={LayoutDashboard}
            label="Dashboards"
            to="/"
            isActive={currentPath === '/'}
            isOpen={isOpen}
          />
          <NavItem
            icon={Building2} // Or use Store again if you prefer
            label="Business"
            to="/business"
            isActive={currentPath === '/business'}
            isOpen={isOpen}
          />
          
          {/* Add Services Section */}
          <NavItem
            icon={Grid} 
            label="Services"
            to="/services"
            isActive={currentPath === '/services'}
            isOpen={isOpen}
          />
        </NavSection>

        <NavSection title="Apps" isOpen={isOpen}>
          <NavItem
            icon={Calendar}
            label="Calendar"
            to="/calendar"
            isActive={currentPath === '/calendar'}
            isOpen={isOpen}
          />
          <NavItem
            icon={FileText}
            label="Online Bookings"
            to="/bookings"
            isActive={currentPath === '/bookings'}
            isOpen={isOpen}
          />
          <NavItem
            icon={Users}
            label="Teams"
            to="/teams"
            isActive={currentPath === '/teams'}
            isOpen={isOpen}
          />
        </NavSection>

        <NavSection title="Custom" isOpen={isOpen}>
          <NavItem
            icon={UserCircle}
            label="Logout"
            to="#"
            isActive={false}
            isOpen={isOpen}
            onClick={handleLogout} 
          />
        </NavSection>
      </div>
    </aside>
  );
}

export default Sidebar;

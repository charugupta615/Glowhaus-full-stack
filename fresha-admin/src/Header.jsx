// import React from 'react';
// import { 
//   Moon,
// } from 'lucide-react';
// import './styles/Header.css';

// function Header() {
//   const toggleTheme = () => {
//     const currentTheme = document.documentElement.getAttribute('data-theme');
//     const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('theme', newTheme);
//   };

//   return (
//     <nav className="header-nav">
//       <div className="nav-icons">
//         <button className="nav-icon-btn" onClick={toggleTheme}>
//           <Moon size={20} /> 
//         </button>
//       </div>

//       <div className="user-profile">
//         <img 
//           src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//           alt="User avatar"
//           className="user-avatar"
//         />
//         <div className="user-info">
//           <span className="user-name">Dominic Keller</span>
//           <span className="user-role">Founder</span>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Header;



import React from 'react';
import { Moon } from 'lucide-react';
import './styles/Header.css';

function Header() {
  // Get the admin name from localStorage, which should have been saved during login
  const adminName = localStorage.getItem("adminName");

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <nav className="header-nav">
      <div className="nav-icons">
        <button className="nav-icon-btn" onClick={toggleTheme}>
          <Moon size={20} /> 
        </button>
      </div>

      <div className="user-profile">
        <img 
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="User avatar"
          className="user-avatar"
        />
        <div className="user-info">
          <span className="user-name">{adminName || 'Admin'}</span> {/* Display the admin's name */}
          <span className="user-role">Founder</span>
        </div>
      </div>
    </nav>
  );
}

export default Header;


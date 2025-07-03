const NavSection = ({ title, children, isOpen  }) => (
    <div className="nav-section">
      {isOpen && <h3 className="nav-section-title">{title}</h3>}
      <div>{children}</div>
    </div>
  );
  export default NavSection
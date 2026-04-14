import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast('Logged out successfully', 'info');
    navigate('/');
  };

  const navClass = ({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab');

  return (
    <nav id="mainNav">
      <div className="nav-logo">
        <div className="nav-logo-dot"></div>
        LIFELINK
      </div>
      <div className="nav-tabs">
        <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
        <NavLink to="/donors" className={navClass}>Donors</NavLink>
        <NavLink to="/emergency" className={navClass}>Emergency</NavLink>
        <NavLink to="/bloodbank" className={navClass}>Blood Bank</NavLink>
        <NavLink to="/map" className={navClass}>Network Map</NavLink>
        <NavLink to="/profile" className={navClass}>Profile</NavLink>
      </div>
      <div className="nav-right">
        <div className="notif-btn" onClick={() => navigate('/emergency')}>
          🔔<div className="notif-badge">3</div>
        </div>
        <div className="avatar" id="navAva" onClick={() => navigate('/profile')}>
          {user?.name?.substring(0, 2).toUpperCase() || 'U'}
        </div>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Compass, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === '/auth' || location.pathname === '/questionnaire';

  if (isAuthPage) return null;

  return (
    <nav className="premium-navbar">
      <div className="nav-container">
        <div className="nav-brand" onClick={() => navigate('/home')}>
          TripToIndia <Compass className="brand-icon" size={24} />
        </div>
        
        <div className="nav-links">
          <button className="nav-btn" onClick={() => navigate('/home')}>Dashboard</button>
          <div className="nav-profile">
            <button className="nav-action-btn"><User size={20} /></button>
            <button className="nav-action-btn" onClick={() => navigate('/auth')}><LogOut size={20} /></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

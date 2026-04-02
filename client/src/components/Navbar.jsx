import React from 'react';
import { Heart, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <div className="navbar-logo" onClick={() => onNavigate('home')}>
          <span className="logo-trip">Trip</span>
          <span className="logo-to">To</span>
          <span className="logo-india">India</span>
        </div>

        <div className="navbar-links">
          <button className="nav-link" onClick={() => onNavigate('home')}>Home</button>
          <button className="nav-link" onClick={() => onNavigate('home', null, 'destinations')}>Destinations</button>
          <button className="nav-link" onClick={() => onNavigate('home', null, 'all-states')}>All States</button>
          <button className="nav-link" onClick={() => onNavigate('itinerary')}>Plan Itinerary</button>
        </div>

        <div className="navbar-actions">
          <button className="icon-btn"><Heart size={20} /></button>
          <button className="icon-btn"><User size={20} /></button>
          <button className="book-btn">Book Now</button>
        </div>

      </div>
    </nav>
  );
}

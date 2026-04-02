import React from 'react';
import { 
  Plus, ArrowRight, MapPin, Calendar, Users, Plane, Train, Bus, Car, 
  RefreshCw, Download, Share2, Compass 
} from 'lucide-react';
import './GeneratedItinerary.css';

export default function GeneratedItinerary({ data, onRestart, onHome }) {
  if (!data) return null;

  const getTransportIcon = (mode) => {
    switch (mode) {
      case 'Flight': return <Plane size={18} />;
      case 'Train': return <Train size={18} />;
      case 'Bus': return <Bus size={18} />;
      case 'Car': return <Car size={18} />;
      default: return <Plane size={18} />;
    }
  };

  return (
    <div className="generated-itinerary-container">
      <div className="itinerary-max-width">
        
        {/* Header Card */}
        <div className="itinerary-header-card">
          <div className="itinerary-chip">
            <Compass size={14} /> AI Generated Itinerary
          </div>
          
          <h1 className="itinerary-main-title">{data.title}</h1>
          
          <div className="itinerary-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Duration</span>
              <span className="meta-value"><Calendar size={18} /> {data.days} Days</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Travelers</span>
              <span className="meta-value"><Users size={18} /> {data.totalTravelers} ({data.groupType})</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Travel Mode</span>
              <span className="meta-value">{getTransportIcon(data.travelMode)} {data.travelMode}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Est. Budget</span>
              <span className="meta-value">₹{data.budgetPerPerson.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Day Wise Detail */}
        <h2 className="plan-section-title">Day-by-Day Plan</h2>
        <div className="days-stack">
          {data.plan.map((dayPlan) => (
            <div key={dayPlan.day} className="day-card-modern">
              <div className="day-sidebar">
                <span className="day-number">Day</span>
                <span className="day-count">{dayPlan.day}</span>
              </div>
              <div className="day-body">
                <h3 className="day-card-title">{dayPlan.title}</h3>
                <p className="day-card-desc">{dayPlan.desc}</p>
                <div className="day-tags">
                  {dayPlan.tags.map((tag, idx) => (
                    <span key={idx} className="day-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="itinerary-actions">
          <button className="btn-primary" onClick={onHome}>
            Back to Home
          </button>
          <button className="btn-secondary" onClick={onRestart}>
            <RefreshCw size={18} style={{ marginRight: '8px' }} /> Plan Another Trip
          </button>
        </div>

      </div>
    </div>
  );
}

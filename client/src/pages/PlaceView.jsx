import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getPlaceById } from '../data/indiaData';
import { MapPin, ArrowLeft, Sun, CheckCircle } from 'lucide-react';
import './PlaceView.css';

const PlaceView = () => {
  const { stateId, placeId } = useParams();
  const navigate = useNavigate();
  const placeData = getPlaceById(stateId, placeId);
  const [vibe, setVibe] = useState('heritage');

  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('tripPreferences'));
      if (prefs && prefs[4]) setVibe(prefs[4]);
    } catch(e) {}
  }, []);

  if (!placeData) {
    return <div className="place-not-found">Destination not found.</div>;
  }

  return (
    <div className="place-page">
      {/* Hero Section */}
      <section className="place-hero">
        <div className="place-hero-bg" style={{ backgroundImage: `url(${placeData.heroImage})` }}>
          <div className="place-overlay"></div>
          <div className="container place-hero-content">
            <button className="back-btn" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} /> Back to State
            </button>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="place-title"
            >
              {placeData.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="place-tagline"
            >
              <MapPin size={20} className="inline-icon" /> {placeData.shortDesc}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Itinerary Timeline */}
      <section className="section bg-light">
        <div className="container center-container">
          <h2 className="section-title text-center">Your Premium Itinerary</h2>
          
          <div className="itinerary-timeline">
            {placeData.itinerary.map((dayPlan, idx) => (
              <motion.div 
                key={idx}
                className="itinerary-day card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
              >
                <div className="day-badge">Day {dayPlan.day}</div>
                <div className="day-content">
                  <h3>{dayPlan.title}</h3>
                  <p>{dayPlan.desc}</p>
                  <div className="day-highlight">
                    <Sun size={18} className="highlight-icon"/>
                    <span>Highlight: <strong>{dayPlan.highlight}</strong></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {placeData.hiddenGems && placeData.hiddenGems.length > 0 && (
            <div className="hidden-gems-section mt-3" style={{maxWidth: '800px', margin: '3rem auto'}}>
              <h3 className="tips-title" style={{color: 'var(--color-success)', borderLeft: '5px solid var(--color-success)', paddingLeft: '1rem'}}>Secret Spots & Hidden Gems</h3>
              <div className="grid grid-2 mt-2">
                {placeData.hiddenGems.map((gem, idx) => (
                  <div key={idx} className="card p-3" style={{ borderTop: '3px solid var(--color-success)'}}>
                    <h4 style={{marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success-light)'}}><MapPin size={18} />{gem.name}</h4>
                    <p style={{marginBottom: 0, color: 'var(--color-text-light)'}}>{gem.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="smart-tips-container card glow-border mt-3">
            <h3 className="tips-title">💡 Essential Tips for {placeData.name}</h3>
            <ul className="tips-list">
              {placeData.tips.map((tip, idx) => (
                <li key={idx}><CheckCircle size={20} className="tip-check" /> {tip}</li>
              ))}
              {vibe === 'nature' && <li><CheckCircle size={20} className="tip-check" /> AI Suggestion: Pack an umbrella, trekking meds, and tents!</li>}
              {vibe === 'heritage' && <li><CheckCircle size={20} className="tip-check" /> AI Suggestion: Ensure your camera has plenty of storage for the heritage sites.</li>}
            </ul>
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.25rem', borderRadius: 'var(--radius-full)' }}>
              Book This Experience Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceView;

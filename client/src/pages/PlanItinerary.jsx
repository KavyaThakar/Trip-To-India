import React, { useState, useEffect } from 'react';
import { Plus, Minus, ChevronDown, Clock, Download, MapPin, Heart, Landmark, Coffee, Backpack, Sun, Waves, Camera, Briefcase, Droplet, Mountain, Footprints, Utensils, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateCityItinerary } from '../api/itineraryApi';
import { statesData as rawStatesData } from '../data/statesData';
import './PlanItinerary.css';

export default function PlanItinerary() {
  const [days, setDays] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [cityTips, setCityTips] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [tripType, setTripType] = useState('Family'); // Default

  // Fetch preferences on load to set tripType
  useEffect(() => {
    const savedPrefs = localStorage.getItem('user_prefs');
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        if (parsed.tripType) setTripType(parsed.tripType);
      } catch (e) { console.error("Error parsing prefs", e); }
    }
  }, []);

  // Generate itinerary from Backend
  const generatePlan = async (city = selectedCity) => {
    if (!city) return;
    
    setIsGenerating(true);
    try {
      const result = await generateCityItinerary({ 
        city, 
        state: selectedState,
        duration: 5, // Default, can be dynamic
        tripType 
      });

      if (result.success) {
        setDays(result.data.plan);
        setCityTips(result.cityDetail?.tips || []);
      }
    } catch (error) {
      console.error("Itinerary Generation Error:", error);
      alert("Failed to generate your personalized itinerary. Please try again!");
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (selectedCity) {
      generatePlan();
    }
  }, [selectedCity]);

  // CATEGORIES & FILTERING
  const categories = ['All', 'Food', 'Culture', 'Tips'];
  const getFilteredTips = () => {
    if (activeCategory === 'All') return cityTips;
    // Map categories to matching tips
    return cityTips.filter(tip => {
      if (activeCategory === 'Food' && tip.text.toLowerCase().includes('food')) return true;
      if (activeCategory === 'Tips' && tip.season) return true;
      return false;
    });
  };

  const statesData = rawStatesData.reduce((acc, state) => {
    acc[state.name] = state.cities.map(city => city.name);
    return acc;
  }, {});

  const handleDownload = () => {
    const content = days.map(d => `Day ${d.day}: ${d.title}\nActivities:\n${d.places.join('\n')}\nFood Suggestions: ${d.food.join(', ')}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TripToIndia_${selectedCity}_Itinerary.txt`;
    link.click();
  };

  return (
    <div className="itinerary-page">
      <section className="itinerary-hero">
        <h1 className="itinerary-hero-title">Your Indian Adventure Awaits</h1>
        <p className="itinerary-hero-subtitle">Premium, Narrated Experiences for {selectedCity || 'Your Destination'}</p>
      </section>

      <div className="itinerary-container">
        
        {/* LEFT COLUMN: The "Visitor View" Timeline */}
        <div className="itinerary-timeline">
          <div className="location-selection-row">
            <div className="select-group">
              <label>State</label>
              <div className="custom-select-wrapper">
                <select 
                  className="custom-select"
                  value={selectedState} 
                  onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}
                >
                  <option value="">Select State</option>
                  {Object.keys(statesData).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="select-arrow" size={18} />
              </div>
            </div>

            <div className="select-group">
              <label>City</label>
              <div className="custom-select-wrapper">
                <select 
                  className="custom-select"
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                >
                  <option value="">Select City</option>
                  {selectedState && statesData[selectedState].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="select-arrow" size={18} />
              </div>
            </div>
          </div>

          <div className="itinerary-header-row">
            <h2 className="itinerary-section-title">
              {selectedCity ? `Exploring ${selectedCity}` : "Plan Your Journey"}
            </h2>
            <div className="header-actions">
              <button className="regenerate-btn" onClick={() => generatePlan()} disabled={!selectedCity || isGenerating}>
                {isGenerating ? "Crafting..." : "Refresh Plan"}
              </button>
              <button className="download-btn" onClick={handleDownload} disabled={days.length === 0}>
                <Download size={16} /> Save Plan
              </button>
            </div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line"></div>

            {isGenerating ? (
              [1, 2, 3].map(n => (
                <div key={n} className="day-item skeleton-item">
                  <div className="timeline-marker skeleton-circle"></div>
                  <div className="day-card skeleton-card">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line"></div>
                  </div>
                </div>
              ))
            ) : days.length === 0 ? (
              <div className="empty-itinerary">
                <MapPin size={48} className="empty-icon" />
                <h3>No Itinerary Yet</h3>
                <p>Select a city to generate a premium, narrated travel plan.</p>
              </div>
            ) : (
              days.map((day, index) => (
                <div key={index} className="day-item">
                  <div className={`timeline-marker ${index % 2 === 0 ? '' : 'green'}`}>
                    {day.day}
                  </div>

                  <div className="day-card animate-fade-in">
                    <div className="day-card-header">
                      <div className="day-title-wrapper">
                        <span className="day-number">Day {day.day}</span>
                        <h3 className="day-theme-title">{day.title}</h3>
                      </div>
                    </div>
                    
                    <div className="narrative-activity-list">
                      {day.places.map((activity, actIndex) => (
                        <div key={actIndex} className="narrative-activity-item">
                          <div className="activity-dot"></div>
                          <p className="activity-text">{activity}</p>
                        </div>
                      ))}
                    </div>

                    <div className="day-food-recommendations">
                      <div className="food-header">
                        <Utensils size={16} />
                        <span>Dining Recommendations</span>
                      </div>
                      <div className="food-tags">
                        {day.food.map((f, i) => <span key={i} className="food-tag">{f}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Contextual Tips */}
        <div className="tips-sidebar">
          <div className="sidebar-header">
            <h2 className="itinerary-section-title">Local Insights</h2>
            {selectedCity && <span className="tips-location"><Info size={14} /> Knowledge for {selectedCity}</span>}
          </div>

          <div className="category-chips">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="tips-list-v2">
            {getFilteredTips().length > 0 ? (
              getFilteredTips().map((tip, idx) => (
                <div key={idx} className="tip-card-row">
                  <div className="tip-content">
                    <span className="tip-cat-tag">{tip.season || 'Expert Tip'}</span>
                    <p className="tip-description">{tip.text}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-tips">Select a city to see localized tips.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

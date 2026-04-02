import React, { useState, useEffect } from 'react';
import { Plus, Minus, ChevronDown, Clock, Download, MapPin, Heart, Landmark, Coffee, Backpack, Sun, Waves, Camera, Briefcase, Droplet, Mountain, Footprints } from 'lucide-react';
import { tipsData, defaultItinerary, cityItineraries, locationsData, locationSpecificTips } from '../data/tipsData';
import { motion, AnimatePresence } from 'framer-motion';
import './PlanItinerary.css';

// locationsData moved to tipsData.js for cleaner code

export default function PlanItinerary() {
  const [days, setDays] = useState(defaultItinerary);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Generate or Update itinerary (Restored Original AI-Style Logic)
  const generatePlan = (city = selectedCity) => {
    if (!city) return;
    
    setIsGenerating(true);
    
    // Simulate complex AI generation time
    setTimeout(() => {
      let basePlan = cityItineraries[city] || [];
      
      if (basePlan.length === 0) {
        // Dynamic Fallback Generator for any city
        basePlan = [
          { 
            id: 1, 
            title: `Grand Welcome to ${city}`, 
            activities: [`Arrival at ${city} Airport/Station`, `Check-in to your selected accommodation`, `Evening stroll through the vibrant local markets`, `Welcome dinner at a traditional restaurant`] 
          },
          { 
            id: 2, 
            title: `Exploring ${city}'s Hidden Gems`, 
            activities: [`Guided tour of major historical landmarks`, `Photography session at scenic viewpoints`, `Lunch featuring local ${city} delicacies`, `Immersive cultural workshop or museum visit`] 
          },
          { 
            id: 3, 
            title: `Souvenirs & Fond Farewells`, 
            activities: [`Early morning sunrise view`, `Final shopping for authentic local handicrafts`, `Relaxing breakfast at a popular cafe`, `Departure from ${city} with cherished memories`] 
          }
        ];
      }

      setDays(basePlan);
      setIsGenerating(false);
    }, 1200);
  };

  // Re-run whenever city changes
  useEffect(() => {
    if (selectedCity) {
      generatePlan();
    }
  }, [selectedCity]);

  // Filter tips based on city and category
  const getFilteredTips = () => {
    let tips = locationSpecificTips[selectedCity] || [];
    if (tips.length === 0) {
      // Fallback defaults
      tips = [
        { category: 'Best Time', text: 'October to March is peak season', icon: Sun },
        { category: 'Places', text: 'Visit local monuments early morning', icon: Landmark },
        { category: 'Food', text: 'Try the authentic local cuisine', icon: Coffee }
      ];
    }

    if (activeCategory === 'All') return tips;
    return tips.filter(tip => tip.category === activeCategory);
  };

  const categories = ['All', 'Food', 'Places', 'Activities', 'Best Time'];

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'Food': return '#f49342'; // Orange
      case 'Places': return '#276749'; // Green
      case 'Activities': return '#3182ce'; // Blue
      case 'Best Time': return '#ecc94b'; // Yellow
      default: return '#718096';
    }
  };

  const handleAddDay = () => {
    const nextId = days.length > 0 ? Math.max(...days.map(d => d.id)) + 1 : 1;
    const newDay = {
      id: nextId,
      title: 'New Day',
      activities: ['Explore the local area']
    };
    setDays([...days, newDay]);
  };

  const handleDownload = () => {
    const content = days.map(d => `Day ${d.id}: ${d.title}\nActivities: ${d.activities.join(', ')}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Trip_To_India_Itinerary_${selectedCity || 'Plan'}.txt`;
    link.click();
  };

  const handleRemoveDay = (idToRemove) => {
    setDays(days.filter(d => d.id !== idToRemove));
  };

  const handleTitleChange = (id, newTitle) => {
    setDays(days.map(d => (d.id === id ? { ...d, title: newTitle } : d)));
  };

  return (
    <div className="itinerary-page">
      {/* Hero Banner */}
      <section className="itinerary-hero">
        <h1 className="itinerary-hero-title">Plan Your Perfect Trip</h1>
        <p className="itinerary-hero-subtitle">Create a day-by-day itinerary for your Indian adventure</p>
      </section>

      {/* Main Layout Grid */}
      <div className="itinerary-container">
        
        {/* LEFT COLUMN: Timeline */}
        <div className="itinerary-timeline">
          <div className="location-selection-row">
            <div className="select-group">
              <label>Select State</label>
              <div className="custom-select-wrapper">
                <select 
                  className={`custom-select ${selectedState ? 'active' : ''}`}
                  value={selectedState} 
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedCity('');
                  }}
                >
                  <option value="">Select State</option>
                  {Object.keys(locationsData).sort().map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <ChevronDown className="select-arrow" size={18} />
              </div>
            </div>

            <div className="select-group">
              <label>Select Location</label>
              <div className="custom-select-wrapper">
                <select 
                  className={`custom-select ${selectedCity ? 'active' : ''}`}
                  value={selectedCity} 
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedState}
                >
                  <option value="">Select Location</option>
                  {selectedState && locationsData[selectedState].sort().map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <ChevronDown className="select-arrow" size={18} />
              </div>
            </div>
          </div>

          <div className="itinerary-header-row">
            <h2 className="itinerary-section-title">
              {selectedCity ? `Your ${selectedCity} Itinerary` : "Your Itinerary"}
            </h2>
            <div className="header-actions">
              <button className="regenerate-btn" onClick={() => generatePlan()} disabled={!selectedCity || isGenerating}>
                {isGenerating ? "Generating..." : "Regenerate Plan"}
              </button>
              <button className="add-day-btn" onClick={handleAddDay}>
                <Plus size={16} /> Add Day
              </button>
              <button className="download-btn" onClick={handleDownload} disabled={isGenerating}>
                <Download size={16} /> Download
              </button>
            </div>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line"></div>

            {isGenerating ? (
              // Loading Skeleton
              [1, 2, 3].map(n => (
                <div key={n} className="day-item skeleton-item">
                  <div className="timeline-marker skeleton-circle"></div>
                  <div className="day-card skeleton-card">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                </div>
              ))
            ) : (
              days.map((day, index) => (
                <div key={day.id} className="day-item">
                  <div className={`timeline-marker ${index % 2 === 0 ? '' : 'green'}`}>
                    {day.id}
                  </div>

                  <div className="day-card animate-fade-in">
                    <div className="day-card-header">
                      <div className="day-title">
                        Day {day.id}: 
                        <input 
                          className="day-title-input" 
                          value={day.title} 
                          onChange={(e) => handleTitleChange(day.id, e.target.value)}
                        />
                      </div>
                      <button 
                        className="remove-day-btn" 
                        onClick={() => handleRemoveDay(day.id)}
                        title="Remove Day"
                      >
                        <Minus size={20} />
                      </button>
                    </div>
                    
                    <div className="activity-list">
                      {day.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="activity-item">
                          <div className="activity-icon">
                            <Clock size={16} />
                          </div>
                          {activity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Smart Travel Tips */}
        <div className="tips-sidebar">
          <div className="sidebar-header">
            <h2 className="itinerary-section-title">Smart Travel Tips</h2>
            {selectedCity && <span className="tips-location"><MapPin size={14} /> {selectedCity}</span>}
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
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCity + activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="tips-container"
              >
                {getFilteredTips().map((tip, idx) => {
                  const IconComp = tip.icon;
                  return (
                    <div key={idx} className="tip-card-row">
                      <div 
                        className="tip-icon-circle" 
                        style={{ backgroundColor: `${getCategoryColor(tip.category)}15`, color: getCategoryColor(tip.category) }}
                      >
                        <IconComp size={20} />
                      </div>
                      <div className="tip-content">
                        <span className="tip-cat-tag" style={{ color: getCategoryColor(tip.category) }}>{tip.category}</span>
                        <p className="tip-description">{tip.text}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { ArrowLeft, MapPin, Utensils, ShoppingBag, Star, Gem, ChevronRight, Camera } from 'lucide-react';
import { statesData } from '../data/statesData';
import BASE_URL from '../api/apiConfig';
import './StateDetails.css';

export default function StateDetails({ stateId, onBack }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('places');
  const [loadingCity, setLoadingCity] = useState(false);
  const state = statesData.find(s => s.id === stateId);

  if (!state) return <div>State not found.</div>;

  const tabs = [
    { id: 'places', label: 'Places', icon: <MapPin size={16} /> },
    { id: 'food', label: 'Food', icon: <Utensils size={16} /> },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={16} /> },
    { id: 'experiences', label: 'Experiences', icon: <Star size={16} /> },
    { id: 'hiddenGems', label: 'Hidden Gems', icon: <Gem size={16} /> }
  ];

  const handleCityClick = async (city) => {
    setSelectedCity(city);
    setActiveTab('places');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!city.places || city.places.length === 0) {
      setLoadingCity(true);
      try {
        const res = await fetch(`${BASE_URL}/itinerary/city-details`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city: city.name, state: state.name })
        });
        const data = await res.json();
        if (data.places) {
          setSelectedCity(prev => ({ ...prev, ...data }));
        } else {
          console.error("AI returned invalid data:", data);
          // Set a minimal fallback or alert
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoadingCity(false);
      }
    }
  };

  const handleBackToState = () => {
    setSelectedCity(null);
    setActiveTab('places');
  };

  // ========== CITY DETAIL VIEW ==========
  if (selectedCity) {
    return (
      <div className="state-container">
        <section className="state-hero">
          <div className="state-hero-bg" style={{ backgroundImage: `url(${selectedCity.image || state.heroImage})` }} />
          <div className="state-hero-overlay" />
          <button className="back-btn" onClick={handleBackToState}>
            <ArrowLeft size={16} /> Back to {state.name}
          </button>
          <div className="state-hero-content">
            <div className="state-hero-tag">{state.name}</div>
            <h1 className="state-hero-title">{selectedCity.name}</h1>
            <p className="state-hero-subtitle">{selectedCity.tagline}</p>
          </div>
          <div className="tabs-wrapper">
            <div className="tabs-nav">
              {tabs.map(tab => (
                <button key={tab.id} className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="state-content-area">
          {loadingCity ? (
            <div className="empty-state" style={{ padding: '100px 0' }}>
              <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #f49342', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }} />
              <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
              <h3>AI is gathering authentic local insights...</h3>
              <p>Discovering the best places, food, and hidden gems for {selectedCity.name}.</p>
            </div>
          ) : (
            <>
              {activeTab === 'places' && (
                <>
                  <h3 className="section-heading">Top Places in {selectedCity.name}</h3>
                  {selectedCity.places && selectedCity.places.length > 0 ? (
                    <div className="places-grid">
                      {selectedCity.places.map((place, idx) => (
                        <div key={idx} className="place-card city-place-card">
                          <div className="place-icon-container"><MapPin size={24} /></div>
                          <h3 className="place-title">{place.name}</h3>
                          <p className="place-desc">{place.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">Places coming soon for {selectedCity.name}!</div>
                  )}
                </>
              )}

              {activeTab === 'food' && (
                <>
                  <h3 className="section-heading">Must-Try Food in {selectedCity.name}</h3>
                  {selectedCity.food && selectedCity.food.length > 0 ? (
                    <div className="food-list-grid">
                      {selectedCity.food.map((item, idx) => (
                        <div key={idx} className="food-list-card">
                          <div className="food-list-icon"><Utensils size={22} /></div>
                          <div className="food-list-info">
                            <h4 className="food-list-name">{item.name}</h4>
                            <p className="food-list-desc">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">Food recommendations coming soon!</div>
                  )}
                </>
              )}

              {activeTab === 'shopping' && (
                <>
                  <h3 className="section-heading">Shopping in {selectedCity.name}</h3>
                  {selectedCity.shopping && selectedCity.shopping.length > 0 ? (
                    <div className="shopping-grid">
                      {selectedCity.shopping.map((item, idx) => (
                        <div key={idx} className="shopping-card">
                          <div className="shopping-icon-wrap"><ShoppingBag size={28} /></div>
                          <span className="shopping-title">{item.name}</span>
                          <span className="shopping-desc">{item.desc}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">Shopping recommendations coming soon!</div>
                  )}
                </>
              )}

              {activeTab === 'experiences' && (
                <>
                  <h3 className="section-heading">Experiences in {selectedCity.name}</h3>
                  {selectedCity.experiences && selectedCity.experiences.length > 0 ? (
                    <div className="content-card">
                      <p className="content-desc">Immerse yourself in the authentic culture of {selectedCity.name} through these unique activities.</p>
                      <div className="experience-list">
                        {selectedCity.experiences.map((item, idx) => (
                          <div key={idx} className="experience-item">
                            <Star size={16} fill="currentColor" className="experience-icon" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state">Experiences coming soon!</div>
                  )}
                </>
              )}

              {activeTab === 'hiddenGems' && (
                <>
                  <h3 className="section-heading">Hidden Gems in {selectedCity.name}</h3>
                  {selectedCity.hiddenGems && selectedCity.hiddenGems.length > 0 ? (
                    <div className="content-card">
                      <p className="content-desc">Discover lesser-known treasures in {selectedCity.name} that most tourists never find.</p>
                      <div className="gems-list">
                        {selectedCity.hiddenGems.map((item, idx) => (
                          <div key={idx} className={`gem-item ${item.color}`}>
                            <Gem size={20} fill="currentColor" className={`gem-icon ${item.color}`} />
                            <div>
                              <span className="gem-title">{item.title}</span>
                              <span className="gem-desc">{item.desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="empty-state">Hidden gems coming soon!</div>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    );
  }

  // ========== STATE OVERVIEW (CITIES GRID) ==========
  return (
    <div className="state-container">
      <section className="state-hero">
        <div className="state-hero-bg" style={{ backgroundImage: `url(${state.heroImage})` }} />
        <div className="state-hero-overlay" />
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        <div className="state-hero-content">
          <div className="state-hero-tag">{state.tagTitle}</div>
          <h1 className="state-hero-title">{state.name}</h1>
          <p className="state-hero-subtitle">{state.tagline}</p>
        </div>
      </section>

      <section className="state-content-area" style={{ paddingTop: '40px' }}>
        <h3 className="section-heading">Explore Cities in {state.name}</h3>
        <p className="section-subheading">Click on a city to discover its places, food, shopping, experiences and hidden gems</p>

        {state.cities && state.cities.length > 0 ? (
          <div className="cities-grid">
            {state.cities.map((city, idx) => (
              <div key={idx} className="city-card" onClick={() => handleCityClick(city)}>
                <div className="city-card-image" style={{ backgroundImage: `url(${city.image || state.heroImage})` }}>
                  <div className="city-card-overlay">
                    <div className="city-card-badge"><MapPin size={14} /> {state.name}</div>
                  </div>
                </div>
                <div className="city-card-body">
                  <h3 className="city-card-name">{city.name}</h3>
                  <p className="city-card-tagline">{city.tagline}</p>
                  <div className="city-card-stats">
                    <span className="city-stat"><MapPin size={12} /> {city.places?.length || 0} places</span>
                    <span className="city-stat"><Utensils size={12} /> {city.food?.length || 0} food</span>
                    <span className="city-stat"><Gem size={12} /> {city.hiddenGems?.length || 0} gems</span>
                  </div>
                  <div className="city-card-action">
                    Explore {city.name} <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">Cities coming soon for {state.name}!</div>
        )}
      </section>
    </div>
  );
}

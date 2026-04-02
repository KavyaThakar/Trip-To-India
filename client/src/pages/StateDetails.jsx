import React, { useState } from 'react';
import { ArrowLeft, MapPin, Utensils, ShoppingBag, Star, Gem } from 'lucide-react';
import { statesData } from '../data/statesData';
import './StateDetails.css';

export default function StateDetails({ stateId, onBack }) {
  const [activeTab, setActiveTab] = useState('places');
  const state = statesData.find(s => s.id === stateId);

  if (!state) return <div>State not found.</div>;

  const tabs = [
    { id: 'places', label: 'Places', icon: <MapPin size={16} /> },
    { id: 'food', label: 'Food', icon: <Utensils size={16} /> },
    { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={16} /> },
    { id: 'experiences', label: 'Experiences', icon: <Star size={16} /> },
    { id: 'hiddenGems', label: 'Hidden Gems', icon: <Gem size={16} /> }
  ];

  return (
    <div className="state-container">
      {/* Hero Section */}
      <section className="state-hero">
        <div 
          className="state-hero-bg"
          style={{ backgroundImage: `url(${state.heroImage})` }}
        />
        <div className="state-hero-overlay" />
        
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={16} /> Back
        </button>
        
        <div className="state-hero-content">
          <div className="state-hero-tag">{state.tagTitle}</div>
          <h1 className="state-hero-title">{state.name}</h1>
          <p className="state-hero-subtitle">{state.tagline}</p>
        </div>

        {/* Floating Tabs Navigation */}
        <div className="tabs-wrapper">
          <div className="tabs-nav">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content Area */}
      <section className="state-content-area">
        {activeTab === 'places' && (
          <>
            <div className="places-grid">
              {state.tabs.places && state.tabs.places.map((place, idx) => (
                <div key={idx} className="place-card">
                  <div className="place-icon-container">
                    <MapPin size={24} />
                  </div>
                  <h3 className="place-title">{place.name}</h3>
                  <p className="place-desc">{place.desc}</p>
                </div>
              ))}
            </div>

            {state.tabs.attractions && state.tabs.attractions.length > 0 && (
              <>
                <h3 className="section-heading">Famous Attractions</h3>
                <div className="attractions-grid">
                  {state.tabs.attractions.map((attr, idx) => (
                    <div key={idx} className="attraction-card">
                      <div className="attraction-icon-wrap">
                        <Star size={16} fill="currentColor" />
                      </div>
                      <span className="attraction-title">{attr.name}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {(!state.tabs.places || state.tabs.places.length === 0) && (
               <div className="empty-state">More places coming soon to {state.name}!</div>
            )}
          </>
        )}

        {activeTab === 'food' && (
          <>
            {state.tabs.food && state.tabs.food.length > 0 ? (
              <>
                <h3 className="section-heading">Famous Cuisines & Delicacies</h3>
                <div className="food-grid">
                  {state.tabs.food.map((item, idx) => (
                    <div key={idx} className="food-card">
                      <img src={item.image} alt={item.name} className="food-img" />
                      <div className="food-overlay">
                        <div className="food-icon-wrap"><Utensils size={20} /></div>
                        <h4 className="food-title">{item.name}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
               <div className="empty-state">Curated food experiences coming soon!</div>
            )}
          </>
        )}

        {activeTab === 'shopping' && (
          <>
            {state.tabs.shopping && state.tabs.shopping.length > 0 ? (
              <>
                <h3 className="section-heading">Shopping & Local Crafts</h3>
                <div className="shopping-grid">
                  {state.tabs.shopping.map((item, idx) => (
                    <div key={idx} className="shopping-card">
                      <div className="shopping-icon-wrap"><ShoppingBag size={28} /></div>
                      <span className="shopping-title">{item.name}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
               <div className="empty-state">Shopping recommendations coming soon!</div>
            )}
          </>
        )}

        {activeTab === 'experiences' && (
          <>
            {state.tabs.experiences && state.tabs.experiences.list ? (
              <>
                <h3 className="section-heading">Cultural Experiences</h3>
                <div className="content-card">
                  <p className="content-desc">{state.tabs.experiences.description}</p>
                  <div className="experience-list">
                    {state.tabs.experiences.list.map((item, idx) => (
                      <div key={idx} className="experience-item">
                        <Star size={16} fill="currentColor" className="experience-icon" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
               <div className="empty-state">Cultural experiences coming soon!</div>
            )}
          </>
        )}

        {activeTab === 'hiddenGems' && (
          <>
            {state.tabs.hiddenGems && state.tabs.hiddenGems.list ? (
              <>
                <h3 className="section-heading">Hidden Gems & Off-Beat Places</h3>
                <div className="content-card">
                  <p className="content-desc">{state.tabs.hiddenGems.description}</p>
                  <div className="gems-list">
                    {state.tabs.hiddenGems.list.map((item, idx) => (
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
              </>
            ) : (
               <div className="empty-state">Off-beat places coming soon!</div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

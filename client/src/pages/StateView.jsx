import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStateById } from '../data/indiaData';
import { MapPin, ArrowRight } from 'lucide-react';
import './StateView.css';

const StateView = () => {
  const { stateId } = useParams();
  const navigate = useNavigate();
  const stateData = getStateById(stateId);

  if (!stateData) {
    return <div className="state-not-found">State not found. Returning to map...</div>;
  }

  return (
    <div className="state-page">
      {/* State Hero */}
      <section className="state-hero">
        <div className="state-hero-bg" style={{ backgroundImage: `url(${stateData.heroImage})` }}>
          <div className="state-overlay"></div>
          <div className="container state-hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="state-title"
            >
              {stateData.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="state-tagline"
            >
              {stateData.tagline}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Description & Places */}
      <section className="section bg-light">
        <div className="container">
          <div className="state-desc-container">
            <p className="state-desc">{stateData.description}</p>
          </div>

          <h2 className="section-title text-center mt-3">Top Places to Visit</h2>
          
          <div className="places-grid">
            {stateData.places.map((place, idx) => (
              <motion.div 
                key={place.id}
                className="place-card"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(`/place/${stateData.id}/${place.id}`)}
              >
                <div className="place-img-wrap">
                  <img src={place.image} alt={place.name} className="place-img" />
                </div>
                <div className="place-info">
                  <h3><MapPin size={20} className="inline-icon" /> {place.name}</h3>
                  <p>{place.shortDesc}</p>
                  <div className="place-action">
                    <span>View Itinerary</span>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {stateData.hiddenGems && stateData.hiddenGems.length > 0 && (
            <div className="hidden-gems-section mt-3">
              <h2 className="section-title text-center" style={{color: 'var(--color-success)'}}>Hidden Gems</h2>
              <div className="places-grid">
                {stateData.hiddenGems.map((gem, idx) => (
                  <motion.div 
                    key={idx}
                    className="place-card"
                    style={{ borderTop: '4px solid var(--color-success)' }}
                    whileHover={{ y: -10 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {gem.image && (
                      <div className="place-img-wrap" style={{height: '200px'}}>
                        <img src={gem.image} alt={gem.name} className="place-img" />
                      </div>
                    )}
                    <div className="place-info">
                      <h3 style={{color: 'var(--color-success-light)'}}><MapPin size={20} className="inline-icon" /> {gem.name}</h3>
                      <p>{gem.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default StateView;

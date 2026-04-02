import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Star, Map } from 'lucide-react';
import { statesData, heroSlides } from '../data/statesData';
import './Home.css';

export default function Home({ onNavigateToState }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));

  const popularStates = statesData.filter(s => s.isPopular);

  return (
    <div className="home-container">
      {/* Hero Carousel */}
      <section className="hero-section">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="hero-background"
            style={{
              backgroundImage: `url(${slide.image})`,
              opacity: index === currentSlide ? 1 : 0
            }}
          />
        ))}
        <div className="hero-overlay" />
        
        <button className="hero-arrow left" onClick={prevSlide}><ChevronLeft size={24} /></button>
        
        <div className="hero-content">
          <h1 className="hero-title">{heroSlides[currentSlide].title}</h1>
          <p className="hero-subtitle">{heroSlides[currentSlide].subtitle}</p>
          <button className="explore-btn" onClick={() => onNavigateToState(heroSlides[currentSlide].stateId)}>
            Explore India
          </button>
        </div>

        <button className="hero-arrow right" onClick={nextSlide}><ChevronRight size={24} /></button>

        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="section-wrapper">
        <div className="section-header">
          <div className="section-tag"><Star size={14} fill="currentColor" /> TOP PICKS</div>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">Discover the most visited and loved destinations across India</p>
        </div>

        <div className="states-grid popular">
          {popularStates.map(state => (
            <div key={state.id} className="state-card" onClick={() => onNavigateToState(state.id)}>
              <img src={state.thumbnail} alt={state.name} className="card-image" />
              <div className="card-overlay">
                <div className="card-tag">
                  <MapPin size={12} fill="currentColor" /> {state.tagTitle}
                </div>
                <h3 className="card-title">{state.name}</h3>
                <p className="card-desc">{state.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All 28 States */}
      <section id="all-states" className="section-wrapper" style={{ paddingTop: '40px', paddingBottom: '120px' }}>
        <div className="section-header">
          <div className="section-tag" style={{ color: '#276749' }}><Map size={14} /> COMPLETE INDIA</div>
          <h2 className="section-title">Explore All 28 States</h2>
          <p className="section-subtitle">From Kashmir to Kanyakumari, every state has a unique story to tell</p>
        </div>

        <div className="states-grid all-states">
          {statesData.map(state => (
            <div key={state.id} className="state-card" style={{ height: '320px' }} onClick={() => onNavigateToState(state.id)}>
              <img src={state.thumbnail} alt={state.name} className="card-image" />
              <div className="card-overlay" style={{ padding: '20px' }}>
                <div className="card-tag">
                  <MapPin size={12} fill="currentColor" /> {state.tagTitle}
                </div>
                <h3 className="card-title" style={{ fontSize: '24px' }}>{state.name}</h3>
                <p className="card-desc" style={{ fontSize: '12px' }}>{state.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

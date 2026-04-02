import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, Users, User, Tent, Umbrella, Landmark, MapPin, 
  Sun, Snowflake, CloudRain, Plane, Train, Bus, Car, Clock, Home
} from 'lucide-react';
import './Onboarding.css';
import indiaBg from '../assets/tiranga_bg.png';

export default function Onboarding({ onFinish }) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;

  // Form State
  const [budget, setBudget] = useState(50000);
  const [travelMates, setTravelMates] = useState("Friends");
  const [travelersCount, setTravelersCount] = useState(2);
  const [destinationType, setDestinationType] = useState("Mountains");
  const [tripDuration, setTripDuration] = useState(5);
  const [season, setSeason] = useState("Summer");
  const [transport, setTransport] = useState("Flight");

  const progress = Math.round((step / totalSteps) * 100);

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const prevStep = () => { if (step > 1) setStep(step - 1); };

  const variants = {
    enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
  };

  const getStepContent = () => {
    switch (step) {
      case 1: // Budget
        return (
          <div className="step-container">
            <h2 className="step-title">What's your budget?</h2>
            <p className="step-subtitle">Tell us your approximate travel budget per person</p>
            <div className="budget-display">
              <span className="budget-amount">₹{budget.toLocaleString('en-IN')}</span>
            </div>
            <p className="budget-per-person">per person</p>
            <div className="slider-container">
              <input type="range" min="10000" max="200000" step="5000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
              <div className="slider-labels">
                <span>₹10,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>
          </div>
        );
      case 2: // Who are you traveling with?
        return (
          <div className="step-container">
            <h2 className="step-title">Who are you traveling with?</h2>
            <p className="step-subtitle">Choose your travel companions</p>
            <div className="options-grid grid-2">
              {[
                { id: 'Solo', icon: <User size={32} /> },
                { id: 'Friends', icon: <Users size={32} /> },
                { id: 'Family', icon: <Users size={32} /> },
                { id: 'Couple', icon: <Users size={32} /> }
              ].map((opt) => (
                <button key={opt.id} onClick={() => setTravelMates(opt.id)}
                  className={`option-card card-large ${travelMates === opt.id ? 'selected' : ''}`}>
                  <div className="option-icon">{opt.icon}</div>
                  <span className="option-text">{opt.id}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 3: // How many travelers?
        return (
          <div className="step-container">
            <h2 className="step-title">How many travelers?</h2>
            <p className="step-subtitle">Number of people in your group</p>
            <div className="counter-wrapper">
              <span className="counter-value">{travelersCount}</span>
              <p className="counter-label">travelers</p>
              <div className="counter-controls">
                <button onClick={() => setTravelersCount(Math.max(1, travelersCount - 1))} className="counter-btn">-</button>
                <button onClick={() => setTravelersCount(travelersCount + 1)} className="counter-btn">+</button>
              </div>
            </div>
          </div>
        );
      case 4: // Destination type
        return (
          <div className="step-container">
            <h2 className="step-title">What type of destination?</h2>
            <p className="step-subtitle">Select your preferred travel experience</p>
            <div className="options-grid grid-3">
              {[
                { id: 'Mountains', icon: <Tent size={32} /> },
                { id: 'Beaches', icon: <Umbrella size={32} /> },
                { id: 'Heritage', icon: <Landmark size={32} /> },
                { id: 'City', icon: <MapPin size={32} /> },
                { id: 'Adventure', icon: <MapPin size={32} /> },
              ].map((opt) => (
                <button key={opt.id} onClick={() => setDestinationType(opt.id)}
                  className={`option-card card-small ${destinationType === opt.id ? 'selected' : ''}`}>
                  <div className="option-icon">{opt.icon}</div>
                  <span className="option-text">{opt.id}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 5: // Trip Duration
        return (
          <div className="step-container">
            <h2 className="step-title">How long is your trip?</h2>
            <p className="step-subtitle">Number of days you plan to travel</p>
            <div className="counter-wrapper">
              <span className="counter-value" style={{ color: '#ed8936' }}>{tripDuration}</span>
              <p className="counter-label">days</p>
              <div className="counter-controls">
                <button onClick={() => setTripDuration(Math.max(1, tripDuration - 1))} className="counter-btn">-</button>
                <button onClick={() => setTripDuration(tripDuration + 1)} className="counter-btn">+</button>
              </div>
            </div>
          </div>
        );
      case 6: // Season
        return (
          <div className="step-container">
            <h2 className="step-title">When are you traveling?</h2>
            <p className="step-subtitle">Select the preferred season for your trip</p>
            <div className="options-grid grid-3">
              {[
                { id: 'Summer', icon: <Sun size={32} /> },
                { id: 'Winter', icon: <Snowflake size={32} /> },
                { id: 'Monsoon', icon: <CloudRain size={32} /> }
              ].map((opt) => (
                <button key={opt.id} onClick={() => setSeason(opt.id)}
                  className={`option-card card-small tall ${season === opt.id ? 'selected' : ''}`}>
                  <div className="option-icon">{opt.icon}</div>
                  <span className="option-text">{opt.id}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 7: // Transportation
        return (
          <div className="step-container">
            <h2 className="step-title">Preferred transportation?</h2>
            <p className="step-subtitle">How do you want to travel between destinations?</p>
            <div className="options-grid grid-2">
              {[
                { id: 'Flight', icon: <Plane size={32} /> },
                { id: 'Train', icon: <Train size={32} /> },
                { id: 'Bus', icon: <Bus size={32} /> },
                { id: 'Car', icon: <Car size={32} /> }
              ].map((opt) => (
                <button key={opt.id} onClick={() => setTransport(opt.id)}
                  className={`option-card card-large ${transport === opt.id ? 'selected' : ''}`}>
                  <div className="option-icon">{opt.icon}</div>
                  <span className="option-text">{opt.id}</span>
                </button>
              ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">

        <div className="progress-info">
          <span className="step-text">Question {step} of {totalSteps}</span>
          <span className="percentage-text">{progress}%</span>
        </div>
        <div className="progress-track">
          <motion.div className="progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: "easeOut" }} />
        </div>
      </div>

      <div className="onboarding-card">
        <div className="step-content-wrapper">
          <AnimatePresence mode="wait" custom={1}>
            <motion.div key={step} className="step-content" variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3, ease: "easeInOut" }}>
              {getStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="step-footer">
          {step > 1 ? (
            <button onClick={prevStep} className="btn-back">
              <ArrowLeft size={18} /> Back
            </button>
          ) : <div></div>}
          
          <button onClick={nextStep} className="btn-next">
            {step === totalSteps ? 'Home' : 'Next'} {step === totalSteps ? <Home size={18} /> : <ArrowRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Questionnaire.css';

const questions = [
  {
    id: 1,
    title: "Who's traveling with you?",
    options: [
      { id: 'solo', label: 'Solo', icon: '🧍' },
      { id: 'couple', label: 'Couple', icon: '👫' },
      { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
      { id: 'friends', label: 'Friends', icon: '🎉' },
    ]
  },
  {
    id: 2,
    title: "How many members are traveling?",
    type: 'number',
    placeholder: "Enter number (e.g., 4)"
  },
  {
    id: 3,
    title: "What is your estimated budget (per person)?",
    type: 'range',
    min: 10000,
    max: 200000,
    step: 5000
  },
  {
    id: 4,
    title: "What vibe are you looking for?",
    options: [
      { id: 'heritage', label: 'Heritage & Culture', icon: '🕌' },
      { id: 'nature', label: 'Mountains & Nature', icon: '🏔️' },
      { id: 'beaches', label: 'Beaches & Relax', icon: '🏖️' },
      { id: 'pilgrim', label: 'Spiritual / Pilgrim', icon: '🛕' },
      { id: 'adventure', label: 'Adventure', icon: '🧗' },
    ]
  }
];

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data for dynamic home page
      localStorage.setItem('tripPreferences', JSON.stringify(answers));
      // Finished questionnaire
      navigate('/home');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQ = questions[currentStep];
  const isLast = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-page">
      <div className="q-header">
        <h2 className="q-logo">TripToIndia</h2>
        <div className="q-progress-container">
          <div className="q-progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="q-step-text">Step {currentStep + 1} of {questions.length}</p>
      </div>

      <div className="q-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="q-content card"
          >
            <h1 className="q-title">{currentQ.title}</h1>

            <div className="q-options">
              {currentQ.type === 'number' ? (
                <input
                  type="number"
                  className="q-input"
                  placeholder={currentQ.placeholder}
                  value={answers[currentQ.id] || ''}
                  onChange={(e) => handleSelect(currentQ.id, e.target.value)}
                  min="1"
                />
              ) : currentQ.type === 'range' ? (
                <div className="q-range-container">
                  <div className="q-range-display">
                    ₹{Number(answers[currentQ.id] || currentQ.min).toLocaleString('en-IN')}
                    {answers[currentQ.id] == currentQ.max ? '+' : ''}
                  </div>
                  <input
                    type="range"
                    className="q-range"
                    min={currentQ.min}
                    max={currentQ.max}
                    step={currentQ.step}
                    value={answers[currentQ.id] || currentQ.min}
                    onChange={(e) => handleSelect(currentQ.id, e.target.value)}
                  />
                  <div className="q-range-labels">
                    <span>₹{Number(currentQ.min).toLocaleString('en-IN')}</span>
                    <span>₹{Number(currentQ.max).toLocaleString('en-IN')}+</span>
                  </div>
                </div>
              ) : (
                currentQ.options.map((opt) => (
                  <button
                    key={opt.id}
                    className={`q-option-btn ${answers[currentQ.id] === opt.id ? 'selected' : ''}`}
                    onClick={() => handleSelect(currentQ.id, opt.id)}
                  >
                    {opt.icon && <span className="q-icon">{opt.icon}</span>}
                    <div className="q-opt-text">
                      <span className="q-opt-label">{opt.label}</span>
                      {opt.desc && <span className="q-opt-desc">{opt.desc}</span>}
                    </div>
                    {answers[currentQ.id] === opt.id && <CheckCircle2 className="q-check" size={20} />}
                  </button>
                ))
              )}
            </div>

            <div className="q-actions">
              <button 
                className={`btn btn-secondary ${currentStep === 0 ? 'hidden' : ''}`} 
                onClick={handleBack}
              >
                <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back
              </button>
              
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                disabled={!answers[currentQ.id]}
                style={{ marginLeft: 'auto' }}
              >
                {isLast ? 'Discover India' : 'Continue'} 
                {isLast ? <CheckCircle2 size={18} style={{ marginLeft: '8px' }} /> : <ArrowRight size={18} style={{ marginLeft: '8px' }} />}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Questionnaire;

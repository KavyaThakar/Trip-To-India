import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Mail, KeyRound, User, ArrowRight } from 'lucide-react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Auth.css';

const slides = [
  { img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=2076", title: "The Taj Mahal", subtitle: "Icon of Eternal Love" },
  { img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=2076", title: "Kerala Backwaters", subtitle: "God's Own Country" },
  { img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=2076", title: "Jaipur Palaces", subtitle: "The Pink City" },
  { img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&q=80&w=2076", title: "Kashmir Valley", subtitle: "Paradise on Earth" }
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill all required fields');
      return;
    }
    setError('');
    // Successful login/register goes to questionnaire
    navigate('/questionnaire');
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left Area: Swiper Carousel */}
      <div className="auth-slider-section">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          speed={1500}
          className="auth-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="auth-slide-bg" style={{ backgroundImage: `url(${slide.img})` }}>
                <div className="auth-slide-overlay">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="auth-slide-content"
                  >
                    <h2>{slide.title}</h2>
                    <p>{slide.subtitle}</p>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Area: Auth Form */}
      <div className="auth-form-section">
        <div className="auth-form-container">
          <div className="auth-header">
            <h1 className="auth-brand">TripToIndia</h1>
            <p className="auth-tagline">Embark on a journey of a lifetime.</p>
          </div>

          <div className="auth-toggle">
            <button 
              className={`toggle-btn ${isLogin ? 'active' : ''}`} 
              onClick={() => { setIsLogin(true); setError(''); }}
            >
              Sign In
            </button>
            <button 
              className={`toggle-btn ${!isLogin ? 'active' : ''}`} 
              onClick={() => { setIsLogin(false); setError(''); }}
            >
              Register
            </button>
            <motion.div 
              className="toggle-indicator"
              layout
              initial={false}
              animate={{
                x: isLogin ? '10%' : '110%',
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {error && <div className="auth-error-msg">{error}</div>}

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="auth-form"
            >
              {!isLogin && (
                <div className="form-group slide-in-bottom">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <User className="input-icon" size={20} />
                    <input type="text" id="name" className="form-control premium-input" placeholder="Maharaja Bhupinder Singh" value={formData.name} onChange={handleInputChange} />
                  </div>
                </div>
              )}

              <div className="form-group slide-in-bottom" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail className="input-icon" size={20} />
                  <input type="email" id="email" className="form-control premium-input" placeholder="traveler@world.com" value={formData.email} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-group slide-in-bottom" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-with-icon">
                  <KeyRound className="input-icon" size={20} />
                  <input type="password" id="password" className="form-control premium-input" placeholder="••••••••" value={formData.password} onChange={handleInputChange} />
                </div>
              </div>

              <button type="submit" className="btn btn-primary premium-submit slide-in-bottom" style={{ animationDelay: '0.3s' }}>
                <span>{isLogin ? 'Begin Journey' : 'Create Account'}</span>
                <ArrowRight size={18} />
              </button>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;

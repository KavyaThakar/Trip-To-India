import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Star, Train, Utensils, Info, MapPin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import MapView from '../components/MapView';
import { getAllStates } from '../data/indiaData';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// --- Hero Slider ---
const heroSlides = [
  { img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2071", title: "Incredible India Awaits You", desc: "Discover a land of vibrant culture and breathtaking landscapes." },
  { img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&q=80&w=2070", title: "Majestic Himalayas", desc: "Experience the serene peaks and adventurous trails." },
  { img: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&q=80&w=2076", title: "Royal Rajasthan", desc: "Step into the era of kings with majestic forts and palaces." }
];

const HeroSection = () => (
  <section className="hero-section">
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="hero-swiper"
    >
      {heroSlides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="hero-slide-bg" style={{ backgroundImage: `url(${slide.img})` }}>
            <div className="hero-overlay"></div>
            <div className="container hero-content">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-title"
              >
                {slide.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-subtitle"
              >
                {slide.desc}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="btn btn-primary hero-btn"
              >
                Book Your Package
              </motion.button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

// --- State-wise Interactive Destinations ---
const InteractiveStates = () => {
  const navigate = useNavigate();
  const states = getAllStates();

  return (
    <section className="section bg-light">
      <div className="container" style={{maxWidth: '1400px'}}>
        <h2 className="section-title text-center">Discover Destinations</h2>
        
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1200: { slidesPerView: 4 }
          }}
          className="states-carousel"
          style={{ paddingBottom: '3rem' }}
        >
          {states.map((st) => (
            <SwiperSlide key={st.id}>
              <motion.div 
                className="state-carousel-card"
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/state/${st.id}`)}
              >
                <div className="scc-img-wrap">
                  <img src={st.heroImage} alt={st.name} className="scc-img" />
                </div>
                <div className="scc-content">
                  <h3>{st.name}</h3>
                  <p>{st.tagline}</p>
                  <span className="scc-btn">Explore <MapPin size={16}/></span>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

// --- Dynamic AI Tips ---
const AIRecommendations = () => {
  const [vibe, setVibe] = useState('heritage');
  
  useEffect(() => {
    try {
      const prefs = JSON.parse(localStorage.getItem('tripPreferences'));
      if (prefs && prefs[4]) { // ID 4 is the vibe question
        setVibe(prefs[4]);
      }
    } catch(e) { console.error("Could not parse prefs"); }
  }, []);

  const vibeTips = {
    nature: {
      title: "Himalayan Nature Trail",
      places: ["Day 1-2: Manali - Solang Valley", "Day 3-4: Kasol & Kheerganga trek", "Day 5: Rohtang Pass"],
      tips: ["Carry warm layers, an umbrella/raincoat, sturdy trekking shoes, and a first-aid kit with altitude sickness meds.", "Tents are highly recommended if you plan on camping near Kheerganga."]
    },
    beaches: {
      title: "Coastal Bliss Tour",
      places: ["Day 1-2: North Goa beaches", "Day 3-4: South Goa tranquility", "Day 5: Gokarna Om Beach"],
      tips: ["Pack high SPF sunscreen, sunglasses, and light cotton clothes.", "Stay hydrated and carry mosquito repellent for evening beach walks."]
    },
    heritage: {
      title: "Golden Triangle Heritage",
      places: ["Day 1-2: Delhi - Red Fort", "Day 3-4: Agra - Taj Mahal", "Day 5-7: Jaipur - Amer Fort"],
      tips: ["Wear comfortable walking shoes for forts.", "Carry a scarf or head-cover for entering spiritual and heritage sites.", "Stay hydrated in the Rajasthan heat."]
    },
    pilgrim: {
      title: "Sacred Spiritual Journey",
      places: ["Day 1-2: Varanasi Ghats & Aarti", "Day 3-4: Ayodhya Ram Mandir", "Day 5: Prayagraj Sangam"],
      tips: ["Dress modestly. Light cotton kurtas are recommended.", "Carry offline maps and loose cash for small donations and street food."]
    },
    adventure: {
      title: "Thrill Seekers Expedition",
      places: ["Day 1-2: Rishikesh River Rafting", "Day 3-4: Auli Skiing", "Day 5: Jim Corbett Safari"],
      tips: ["Carry an action camera, quick-dry clothing, and sturdy boots.", "Ensure your travel insurance covers adventure sports."]
    }
  };

  const currentSuggestion = vibeTips[vibe] || vibeTips.heritage;

  return (
    <section className="section bg-light">
      <div className="container center-container">
        <h2 className="section-title text-center">AI-Powered Itinerary & Tips</h2>
        <p className="text-center mb-3">Customized based on your questionnaire preferences.</p>
        
        <div className="ai-card card">
          <div className="ai-header">
            <Compass className="icon-pulse" />
            <h3>Suggested: {currentSuggestion.title}</h3>
          </div>
          <div className="ai-timeline">
            {currentSuggestion.places.map((place, idx) => (
              <div key={idx} className="ti-item">
                <div className="ti-dot"></div>
                {place}
              </div>
            ))}
          </div>
          
          <div className="tips-box mt-3">
            <h4><Info size={18} /> Smart Packing Tips</h4>
            <ul>
              {currentSuggestion.tips.map((tip, idx) => (
                <li key={idx}><strong>Tip:</strong> {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const DreamTrip = () => (
  <section className="section luxury-section">
    <div className="container">
      <div className="luxury-card">
        <div className="luxury-text">
          <h2 className="luxury-title">The Maharaja Express</h2>
          <p className="luxury-desc">Redefining luxury travel. Traverse through India's most opulent cities in an unparalleled 5-star royal train journey. Plan your ultimate dream trip today.</p>
          <ul className="luxury-features">
            <li><Train size={20} /> 7-Days Imperial Journey</li>
            <li><Star size={20} /> Presidential Suites</li>
            <li><Utensils size={20} /> Michelin-star Fine Dining</li>
          </ul>
          <button className="btn luxury-btn mt-2">View Royal Itineraries</button>
        </div>
        <div className="luxury-image-wrapper">
          <img src="https://images.unsplash.com/photo-1548043000-f7034b7f94bb?auto=format&fit=crop&q=80&w=800" alt="Maharaja Express" className="luxury-img" />
        </div>
      </div>
    </div>
  </section>
);

const SentimentsAndGems = () => (
  <section className="section space-y-4">
    <div className="container">
      <div className="grid grid-2">
        <motion.div whileHover={{ scale: 1.02 }} className="card feature-card">
          <div className="feature-img" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1610091811631-0cb12b07e5e3?auto=format&fit=crop&q=80&w=600')` }}></div>
          <div className="feature-content">
            <h3>Indian Sentiments</h3>
            <p><strong>Wagah Border Ceremony:</strong> Feel the immense patriotism of the Beating Retreat ceremony at the India-Pakistan border.</p>
          </div>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="card feature-card">
          <div className="feature-img" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589136109312-70b9ab1f6920?auto=format&fit=crop&q=80&w=600')` }}></div>
          <div className="feature-content">
            <h3>Hidden Gems</h3>
            <p><strong>Local Food & Stays:</strong> From authentic Rajasthani Thali in local Havelis to homestays in remote Himalayan villages.</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <InteractiveStates />
      <AIRecommendations />
      <DreamTrip />
      
      <section className="section">
        <div className="container">
          <h2 className="section-title mb-2 text-center">Explore on Map</h2>
          <div className="map-container">
            <MapView />
          </div>
        </div>
      </section>

      <SentimentsAndGems />
      
      <footer className="footer">
        <div className="container text-center">
          <h2 className="auth-brand" style={{color: 'var(--color-accent)'}}>TripToIndia</h2>
          <p>© 2026 Incredible India Experiences. High-Level Premium UI.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

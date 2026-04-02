import { useState } from 'react';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import StateDetails from './pages/StateDetails';
import PlanItinerary from './pages/PlanItinerary';
import GeneratedItinerary from './pages/GeneratedItinerary';
import Navbar from './components/Navbar';

function App() {
  const [currentView, setCurrentView] = useState('login');
  const [selectedState, setSelectedState] = useState(null);
  const [itineraryData, setItineraryData] = useState(null);

  const handleNavigate = (view, stateId = null, hash = null) => {
    setCurrentView(view);
    if (stateId) setSelectedState(stateId);
    
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Define which views should show the main Navbar
  const showNav = !['login', 'onboarding'].includes(currentView);

  return (
    <div className="min-h-screen bg-[#faf8f5] font-inter">
      {showNav && (
        <Navbar onNavigate={handleNavigate} />
      )}

      {currentView === 'login' && (
        <Login onLogin={() => handleNavigate('onboarding')} />
      )}
      
      {currentView === 'onboarding' && (
        <Onboarding onFinish={() => handleNavigate('home')} />
      )}

      {currentView === 'home' && (
        <Home onNavigateToState={(stateId) => handleNavigate('stateDetails', stateId)} />
      )}

      {currentView === 'stateDetails' && (
        <StateDetails 
          stateId={selectedState} 
          onBack={() => handleNavigate('home')} 
        />
      )}

      {currentView === 'itinerary' && (
        <PlanItinerary />
      )}

      {currentView === 'generatedItinerary' && (
        <GeneratedItinerary 
          data={itineraryData} 
          onRestart={() => handleNavigate('onboarding')}
          onHome={() => handleNavigate('home')}
        />
      )}
    </div>
  );
}

export default App;

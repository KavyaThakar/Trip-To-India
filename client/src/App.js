import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Questionnaire from './pages/Questionnaire';
import Home from './pages/Home';
import StateView from './pages/StateView';
import PlaceView from './pages/PlaceView';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/home" element={<Home />} />
        <Route path="/state/:stateId" element={<StateView />} />
        <Route path="/place/:stateId/:placeId" element={<PlaceView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail, User } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simulate register
    setError('');
    navigate('/questionnaire');
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="auth-title">Join TripToIndia</h1>
        <p className="auth-subtitle">Your gateway to the incredible India</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleRegister}>
          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" htmlFor="name">Full Name</label>
            <User size={20} style={{ position: 'absolute', bottom: '14px', left: '12px', color: 'var(--color-text-light)' }} />
            <input 
              type="text" 
              id="name" 
              className="form-control" 
              placeholder="Maharaja Bhupinder Singh"
              style={{ paddingLeft: '40px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" htmlFor="email">Email Address</label>
            <Mail size={20} style={{ position: 'absolute', bottom: '14px', left: '12px', color: 'var(--color-text-light)' }} />
            <input 
              type="email" 
              id="email" 
              className="form-control" 
              placeholder="you@example.com"
              style={{ paddingLeft: '40px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ position: 'relative' }}>
            <label className="form-label" htmlFor="password">Password</label>
            <KeyRound size={20} style={{ position: 'absolute', bottom: '14px', left: '12px', color: 'var(--color-text-light)' }} />
            <input 
              type="password" 
              id="password" 
              className="form-control" 
              placeholder="••••••••"
              style={{ paddingLeft: '40px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Register Now
          </button>
        </form>

        <p className="auth-link">
          Already embarking? <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Login here</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;

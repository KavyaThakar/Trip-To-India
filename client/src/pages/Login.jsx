import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { KeyRound, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    // Simulate login
    setError('');
    navigate('/questionnaire');
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="auth-title">TripToIndia</h1>
        <p className="auth-subtitle">Discover the heritage & beauty of India</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
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
            Begin Journey
          </button>
        </form>

        <p className="auth-link">
          New to our journeys? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register'); }}>Create an account</a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;

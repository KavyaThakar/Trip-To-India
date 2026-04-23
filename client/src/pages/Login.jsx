import { useState, useEffect } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "./Login.css";

import BASE_URL from "../api/apiConfig";

export default function Login({ onLogin, onSignup, onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("remembered_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save token for authenticated API calls
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      if (rememberMe) {
        localStorage.setItem("remembered_email", email);
      } else {
        localStorage.removeItem("remembered_email");
      }

      onLogin();
    } catch (err) {
      setError("Unable to connect to server. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      
      <div className="login-card animate-fade-in">
        <h1 className="login-title">
          <span className="title-trip">Trip</span>
          <span className="title-to">To</span>
          <span className="title-india">India</span>
        </h1>

        <p className="login-subtitle">
          Welcome back! Let's explore together
        </p>

        {error && <p style={{ color: '#e53e3e', fontSize: '14px', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input 
                type="email" 
                placeholder="test@example.com" 
                required 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••" 
                required 
                className="form-input password-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="icon-button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <label className="remember-label">
              <input 
                type="checkbox" 
                className="remember-checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="remember-text">Remember me</span>
            </label>
            <button type="button" className="forgot-link" onClick={onForgotPassword}>
              Forgot password?
            </button>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="bottom-text">
          Don't have an account? <button type="button" className="forgot-link create-account" onClick={onSignup}>Create Account</button>
        </p>
      </div>
    </div>
  );
}

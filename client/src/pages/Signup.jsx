import { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff } from "lucide-react";
import "./Signup.css";

import BASE_URL from "../api/apiConfig";

export default function Signup({ onSignup, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      alert("Account created successfully! Please sign in.");
      onSignup();
    } catch (err) {
      setError("Unable to connect to server.");
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-overlay"></div>
      
      <div className="signup-card">
        <h1 className="signup-title">
          <span className="title-trip">Trip</span>
          <span className="title-to">To</span>
          <span className="title-india">India</span>
        </h1>

        <p className="signup-subtitle">
          Create an account to start your adventure
        </p>

        {error && <p style={{ color: '#e53e3e', fontSize: '14px', textAlign: 'center', marginBottom: '12px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input type="text" placeholder="John Doe" required className="form-input"
                value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input type="email" placeholder="john@example.com" required className="form-input"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input type={showPassword ? "text" : "password"} placeholder="••••••••••" required className="form-input password-input"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="icon-button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••••" required className="form-input password-input"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="icon-button">
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="terms-text">
          By signing up, you agree to our <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
        </p>

        <p className="bottom-text">
          Already have an account? <button type="button" className="create-account" onClick={onLogin}>Sign In</button>
        </p>
      </div>
    </div>
  );
}

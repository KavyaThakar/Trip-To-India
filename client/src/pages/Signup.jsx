import { useState } from "react";
import { User, Lock, Mail, Eye, EyeOff, UserPlus } from "lucide-react";
import "./Signup.css";

export default function Signup({ onSignup, onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

        <form onSubmit={(e) => { e.preventDefault(); onSignup(); }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input type="text" placeholder="John Doe" required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input type="email" placeholder="john@example.com" required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••" 
                required 
                className="form-input password-input" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="icon-button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="••••••••••" 
                required 
                className="form-input password-input" 
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="icon-button">
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Create Account
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

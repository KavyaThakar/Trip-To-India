import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      
      <div className="login-card">
        <h1 className="login-title">
          <span className="title-trip">Trip</span>
          <span className="title-to">To</span>
          <span className="title-india">India</span>
        </h1>

        <p className="login-subtitle">
          Welcome back! Let's explore together
        </p>

        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="form-group">
            <label className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <User className="input-icon" />
              <input type="email" placeholder="test@example.com" required className="form-input" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input type={showPassword ? "text" : "password"} placeholder="••••••••••" required className="form-input password-input" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="icon-button">
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="form-actions">
            <label className="remember-label">
              <input type="checkbox" className="remember-checkbox" />
              <span className="remember-text">Remember me</span>
            </label>
            <button type="button" className="forgot-link">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>

        <p className="bottom-text">
          Don't have an account? <button type="button" className="forgot-link create-account">Create Account</button>
        </p>
      </div>
    </div>
  );
}

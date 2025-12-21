import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import '../styles/design-system.css';
import '../styles/components.css';

export default function Login() {
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [credentials, setCredentials] = useState({ email: '', password: '', phone: '' });
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginMethod === 'email') {
        // Email/Password Login
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: credentials.email, 
            password: credentials.password 
          })
        });

        const json = await response.json();

        if (json.success) {
          login(json.user, json.authToken);
          navigate('/restaurants');
        } else {
          setError(json.message || 'Invalid email or password');
        }
      } else {
        // Phone OTP Login
        if (!showOtpInput) {
          // Send OTP
          const response = await fetch('http://localhost:5000/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: credentials.phone })
          });

          const json = await response.json();

          if (json.success) {
            setShowOtpInput(true);
            setOtpTimer(60);
            startOtpTimer();
          } else {
            setError(json.message || 'Failed to send OTP');
          }
        } else {
          // Verify OTP
          const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              phone: credentials.phone, 
              otp: otp 
            })
          });

          const json = await response.json();

          if (json.success) {
            login(json.user, json.authToken);
            navigate('/restaurants');
          } else {
            setError(json.message || 'Invalid OTP');
          }
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startOtpTimer = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: credentials.phone })
      });

      const json = await response.json();

      if (json.success) {
        setOtpTimer(60);
        startOtpTimer();
      } else {
        setError(json.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        {/* Branding Section */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="auth-brand-logo">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M12 3l9 9-9 9" />
              </svg>
              <span>FoodDash</span>
            </div>
            <div>
              <h1 className="auth-brand-title">Welcome Back!</h1>
              <p className="auth-brand-subtitle">
                Sign in to access your account and continue your delicious food journey.
              </p>
            </div>
            <div className="auth-features">
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Browse 100+ restaurants
              </div>
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Fast & secure checkout
              </div>
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Real-time order tracking
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="auth-form-section">
          <div className="auth-mobile-logo">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M12 3l9 9-9 9" />
            </svg>
          </div>

          <div className="auth-form-container">
            <div className="auth-form-header">
              <h2 className="auth-form-title">Sign In</h2>
              <p className="auth-form-subtitle">
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div className="auth-error-message">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            {/* Login Method Toggle */}
            <div className="tabs">
              <button
                className={`tab ${loginMethod === 'email' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMethod('email');
                  setShowOtpInput(false);
                  setError('');
                }}
                type="button"
              >
                Email/Password
              </button>
              <button
                className={`tab ${loginMethod === 'phone' ? 'active' : ''}`}
                onClick={() => {
                  setLoginMethod('phone');
                  setShowOtpInput(false);
                  setError('');
                }}
                type="button"
              >
                Phone OTP
              </button>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {loginMethod === 'email' ? (
                <>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={credentials.email}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="••••••••"
                      value={credentials.password}
                      onChange={onChange}
                      required
                    />
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Link to="/forgot-password" className="auth-link-sm">
                      Forgot password?
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  {!showOtpInput ? (
                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="+1 (555) 000-0000"
                        value={credentials.phone}
                        onChange={onChange}
                        required
                      />
                      <p className="form-hint">We'll send you a verification code</p>
                    </div>
                  ) : (
                    <div>
                      <label className="form-label">Enter OTP</label>
                      <input
                        type="text"
                        maxLength="6"
                        className="form-input"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.5rem' }}
                      />
                      <div className="otp-resend-text">
                        {otpTimer > 0 ? (
                          <span>Resend OTP in {otpTimer}s</span>
                        ) : (
                          <span>
                            Didn't receive code?{' '}
                            <button
                              type="button"
                              onClick={handleResendOtp}
                              className="otp-resend-btn"
                              disabled={loading}
                            >
                              Resend
                            </button>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%' }}>
                {loading ? 'Please wait...' : showOtpInput ? 'Verify OTP' : 'Sign In'}
              </button>
            </form>

            <div className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// , 'Accept': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:3000/login', 'Access-Control-Allow-Credentials': 'true',
//         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';
import '../styles/design-system.css';
import '../styles/components.css';

export default function Signup() {
  const [credentials, setCredentials] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    phone: '',
    role: 'customer',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLocationClick = async () => {
    setLoading(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      const response = await fetch('http://localhost:5000/api/auth/getlocation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latlong: { lat: latitude, long: longitude } })
      });

      const { location } = await response.json();
      setCredentials({ ...credentials, address: location });
    } catch (err) {
      setError('Unable to fetch location. Please enter manually.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          phone: credentials.phone,
          role: credentials.role,
          location: credentials.address
        })
      });

      const json = await response.json();
      console.log('Signup response:', json); // Debug log

      if (json.success) {
        login(json.user, json.authToken);
        navigate('/restaurants');
      } else {
        // Handle validation errors
        if (json.errors && Array.isArray(json.errors)) {
          setError(json.errors.map(err => err.message).join(', '));
        } else {
          setError(json.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error('Signup error:', err); // Debug log
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
              <h1 className="auth-brand-title">Join Our Community</h1>
              <p className="auth-brand-subtitle">
                Create an account to start ordering delicious food from your favorite restaurants.
              </p>
            </div>
            <div className="auth-features">
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free account setup
              </div>
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Exclusive deals & offers
              </div>
              <div className="auth-feature-item">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Order history & tracking
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
              <h2 className="auth-form-title">Create Account</h2>
              <p className="auth-form-subtitle">
                Fill in the details below to get started
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

            <form onSubmit={handleSubmit} className="auth-form">
              {/* Role Selection */}
              <div>
                <label className="form-label">I want to join as</label>
                <div className="role-selector">
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="customer"
                      checked={credentials.role === 'customer'}
                      onChange={onChange}
                    />
                    <div className="role-option-content">
                      <div className="role-option-icon">🛒</div>
                      <div className="role-option-label">Customer</div>
                      <div className="role-option-description">Order food from restaurants</div>
                    </div>
                  </label>
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="restaurant_partner"
                      checked={credentials.role === 'restaurant_partner'}
                      onChange={onChange}
                    />
                    <div className="role-option-content">
                      <div className="role-option-icon">🏪</div>
                      <div className="role-option-label">Restaurant</div>
                      <div className="role-option-description">List your restaurant & menu</div>
                    </div>
                  </label>
                  <label className="role-option">
                    <input
                      type="radio"
                      name="role"
                      value="delivery_partner"
                      checked={credentials.role === 'delivery_partner'}
                      onChange={onChange}
                    />
                    <div className="role-option-content">
                      <div className="role-option-icon">🚴</div>
                      <div className="role-option-label">Delivery</div>
                      <div className="role-option-description">Earn money delivering food</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="John Doe"
                  value={credentials.name}
                  onChange={onChange}
                  required
                />
              </div>

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
                  minLength="6"
                />
                <p className="form-hint">Minimum 6 characters</p>
              </div>

              <div className="form-group">
                <label htmlFor="address" className="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-input"
                  placeholder="123 Main St, City, State"
                  value={credentials.address}
                  onChange={onChange}
                  required
                />
                <button
                  type="button"
                  onClick={handleLocationClick}
                  className="btn btn-ghost btn-sm"
                  disabled={loading}
                  style={{ marginTop: '8px', width: '100%' }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" style={{ marginRight: '8px' }}>
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Use Current Location
                </button>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-lg" 
                disabled={loading}
                style={{ width: '100%' }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
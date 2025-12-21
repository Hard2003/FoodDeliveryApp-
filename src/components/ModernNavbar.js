import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCart, getCartCount } from '../components/CartContext';
import './ModernNavbar.css';

const ModernNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const cart = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="modern-navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M16 8L22 14H18V20H14V14H10L16 8Z" fill="white"/>
              <path d="M10 22H22V24H10V22Z" fill="white"/>
            </svg>
            <span className="navbar-logo-text">FoodHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-menu">
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link 
                to="/myorders" 
                className={`navbar-link ${isActive('/myorders') ? 'navbar-link-active' : ''}`}
              >
                My Orders
              </Link>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Theme Toggle */}
            <button 
              className="navbar-icon-btn" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            {/* Cart */}
            {isAuthenticated && (
              <Link to="/cart" className="navbar-cart-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 2L7.17 4H3V6H21V4H16.83L15 2H9Z"/>
                  <path d="M5 8V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V8H5Z"/>
                </svg>
                {getCartCount(cart) > 0 && (
                  <span className="navbar-cart-badge">{getCartCount(cart)}</span>
                )}
              </Link>
            )}

            {/* Auth Actions */}
            {!isAuthenticated ? (
              <div className="navbar-auth-btns">
                <Link to="/login" className="btn btn-ghost btn-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="navbar-user-menu">
                <button className="navbar-user-btn">
                  <div className="navbar-user-avatar">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="navbar-user-name">{user?.name || 'User'}</span>
                </button>
                <div className="navbar-dropdown">
                  <Link to="/profile" className="navbar-dropdown-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Profile
                  </Link>
                  <Link to="/myorders" className="navbar-dropdown-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18"/>
                    </svg>
                    Orders
                  </Link>
                  <div className="navbar-dropdown-divider"></div>
                  <button onClick={handleLogout} className="navbar-dropdown-item">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                      <polyline points="16 17 21 12 16 7"/>
                      <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="navbar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12"/>
                ) : (
                  <path d="M3 12h18M3 6h18M3 18h18"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <Link to="/" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link to="/myorders" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  My Orders
                </Link>
                <Link to="/profile" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="navbar-mobile-link">
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;

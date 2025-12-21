import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Landing.css';
import '../styles/design-system.css';
import '../styles/components.css';

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: '🍔',
      title: 'Wide Selection',
      description: 'Choose from 100+ restaurants offering diverse cuisines'
    },
    {
      icon: '⚡',
      title: 'Fast Delivery',
      description: 'Get your food delivered hot and fresh in 30 minutes or less'
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      description: 'Multiple payment options with 100% secure transactions'
    },
    {
      icon: '📱',
      title: 'Track Orders',
      description: 'Real-time order tracking from kitchen to your doorstep'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Choose Restaurant',
      description: 'Browse through restaurants and explore menus'
    },
    {
      number: '2',
      title: 'Add to Cart',
      description: 'Select your favorite items and customize them'
    },
    {
      number: '3',
      title: 'Place Order',
      description: 'Choose payment method and confirm your order'
    },
    {
      number: '4',
      title: 'Enjoy Food',
      description: 'Track delivery and enjoy your delicious meal'
    }
  ];

  return (
    <div className="landing-page">
      {/* Navigation Header */}
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="nav-brand">
            <img src="/fooddasher-logo.svg" alt="FoodDash" className="nav-logo" />
          </Link>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/restaurants" className="nav-link">Browse</Link>
                <Link to="/myorders" className="nav-link">My Orders</Link>
                <button onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('userEmail');
                  navigate('/login');
                }} className="nav-btn btn-outline">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Sign In</Link>
                <Link to="/signup" className="nav-btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-badge">
                <span className="badge-icon">🎉</span>
                <span>New: Get 50% off on your first order!</span>
              </div>
              
              <h1 className="hero-title">
                Delicious Food,
                <span className="hero-title-highlight"> Delivered Fast</span>
              </h1>
              
              <p className="hero-subtitle">
                Order from your favorite restaurants and get fresh, hot food delivered to your doorstep in minutes. FoodDash brings the best dining experience right to you.
              </p>

              <div className="hero-buttons">
                {isAuthenticated ? (
                  <button 
                    onClick={() => navigate('/restaurants')} 
                    className="btn btn-primary btn-lg"
                  >
                    <span>Browse Restaurants</span>
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                ) : (
                  <>
                    <Link to="/signup" className="btn btn-primary btn-lg">
                      <span>Get Started</span>
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link to="/login" className="btn btn-secondary btn-lg">
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Restaurants</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Happy Customers</div>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <div className="stat-number">4.8★</div>
                  <div className="stat-label">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="hero-image">
              <div className="floating-card card-1">
                <div className="food-icon">🍛</div>
                <div>
                  <div className="food-name">Biryani</div>
                </div>
              </div>
              <div className="floating-card card-2">
                <div className="food-icon">🍕</div>
                <div>
                  <div className="food-name">Pizza</div>
                </div>
              </div>
              <div className="floating-card card-3">
                <div className="food-icon">🍛</div>
                <div>
                  <div className="food-name">Dal Makhani</div>
                </div>
              </div>
              <div className="floating-card card-4">
                <div className="food-icon">🍔</div>
                <div>
                  <div className="food-name">Burger</div>
                </div>
              </div>
              <div className="floating-card card-5">
                <div className="food-icon">🥘</div>
                <div>
                  <div className="food-name">Butter Chicken</div>
                </div>
              </div>
              <div className="floating-card card-6">
                <div className="food-icon">🍝</div>
                <div>
                  <div className="food-name">Pasta</div>
                </div>
              </div>
              <div className="floating-card card-7">
                <div className="food-icon">🌮</div>
                <div>
                  <div className="food-name">Tacos</div>
                </div>
              </div>
              <div className="floating-card card-8">
                <div className="food-icon">🍜</div>
                <div>
                  <div className="food-name">Noodles</div>
                </div>
              </div>
              <div className="floating-card card-9">
                <div className="food-icon">🍰</div>
                <div>
                  <div className="food-name">Desserts</div>
                </div>
              </div>
              <div className="floating-card card-10">
                <div className="food-icon">🥗</div>
                <div>
                  <div className="food-name">Salad</div>
                </div>
              </div>
              <div className="floating-card card-11">
                <div className="food-icon">🍢</div>
                <div>
                  <div className="food-name">Kebab</div>
                </div>
              </div>
              <div className="floating-card card-12">
                <div className="food-icon">🥪</div>
                <div>
                  <div className="food-name">Sandwich</div>
                </div>
              </div>
              <div className="floating-card card-13">
                <div className="food-icon">🍲</div>
                <div>
                  <div className="food-name">Curry</div>
                </div>
              </div>
              <div className="floating-card card-14">
                <div className="food-icon">🥙</div>
                <div>
                  <div className="food-name">Wrap</div>
                </div>
              </div>
              <div className="floating-card card-15">
                <div className="food-icon">🍩</div>
                <div>
                  <div className="food-name">Donuts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose FoodDash?</h2>
            <p className="section-subtitle">
              Experience the best food delivery service with features designed for your convenience
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get your favorite food delivered in 4 simple steps
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="step-arrow">
                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Order?</h2>
            <p className="cta-subtitle">
              Join thousands of happy customers and experience the best food delivery service today!
            </p>
            <div className="cta-buttons">
              {isAuthenticated ? (
                <button 
                  onClick={() => navigate('/')} 
                  className="btn btn-primary btn-lg"
                >
                  Start Ordering Now
                </button>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary btn-lg">
                    Create Free Account
                  </Link>
                  <Link to="/login" className="btn btn-ghost btn-lg">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">
                <img src="/fooddasher-logo.svg" alt="FoodDash" style={{height: '32px', width: 'auto'}} />
              </div>
              <p className="footer-description">
                Delivering happiness, one meal at a time. Fast, reliable, and delicious.
              </p>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <ul className="footer-list">
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#careers">Careers</a></li>
                  <li><a href="#blog">Blog</a></li>
                  <li><a href="#press">Press</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-heading">For You</h4>
                <ul className="footer-list">
                  <li><Link to="/login">Sign In</Link></li>
                  <li><Link to="/signup">Sign Up</Link></li>
                  <li><a href="#help">Help Center</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
              </div>

              <div className="footer-column">
                <h4 className="footer-heading">Partners</h4>
                <ul className="footer-list">
                  <li><a href="#restaurant">Restaurant Partner</a></li>
                  <li><a href="#delivery">Delivery Partner</a></li>
                  <li><a href="#corporate">Corporate</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 FoodDash. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

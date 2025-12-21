import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './RestaurantList.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    cuisine: '',
    isVeg: false,
    minRating: 0,
    sortBy: 'rating'
  });

  useEffect(() => {
    loadRestaurants();
  }, [filters]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.cuisine) queryParams.append('cuisine', filters.cuisine);
      if (filters.isVeg) queryParams.append('isVeg', 'true');
      if (filters.minRating) queryParams.append('minRating', filters.minRating);
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);

      const response = await fetch(
        `${API_BASE}/restaurants?${queryParams.toString()}`
      );
      const data = await response.json();
      
      if (data.success) {
        setRestaurants(data.restaurants);
      }
    } catch (error) {
      console.error('Error loading restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const cuisineTypes = [
    'All', 'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 
    'Thai', 'American', 'Continental', 'Pizza', 'Burgers'
  ];

  return (
    <div className="restaurant-list-container">
      <Navbar />
      
      {/* Filters Section */}
      <div className="filters-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search restaurants..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                value={filters.cuisine}
                onChange={(e) => setFilters({ ...filters, cuisine: e.target.value })}
              >
                <option value="">All Cuisines</option>
                {cuisineTypes.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="rating">Rating</option>
                <option value="deliveryTime">Delivery Time</option>
                <option value="deliveryFee">Delivery Fee</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                value={filters.minRating}
                onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
              >
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
            <div className="col-md-1">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="vegOnly"
                  checked={filters.isVeg}
                  onChange={(e) => setFilters({ ...filters, isVeg: e.target.checked })}
                />
                <label className="form-check-label" htmlFor="vegOnly">
                  Veg Only
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="container mt-4">
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center">
            <h4>No restaurants found</h4>
            <p>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="row">
            {restaurants.map(restaurant => (
              <div key={restaurant._id} className="col-md-4 col-lg-3 mb-4">
                <Link to={`/restaurant/${restaurant._id}`} className="restaurant-card-link">
                  <div className="card restaurant-card">
                    <div className="restaurant-image-container">
                      <img
                        src={restaurant.bannerImage || restaurant.logo || 'https://via.placeholder.com/300x200?text=Restaurant'}
                        alt={restaurant.name}
                        className="card-img-top restaurant-image"
                      />
                      {restaurant.isPureVeg && (
                        <span className="badge bg-success veg-badge">Pure Veg</span>
                      )}
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{restaurant.name}</h5>
                      <div className="restaurant-info">
                        <div className="rating">
                          <i className="bi bi-star-fill text-warning"></i>
                          <span className="ms-1">{restaurant.rating.toFixed(1)}</span>
                          <span className="text-muted ms-1">({restaurant.totalRatings})</span>
                        </div>
                        <div className="delivery-time">
                          <i className="bi bi-clock"></i>
                          <span className="ms-1">{restaurant.deliveryTime}</span>
                        </div>
                      </div>
                      <div className="cuisine-tags mt-2">
                        {restaurant.cuisineType.slice(0, 3).map((cuisine, idx) => (
                          <span key={idx} className="badge bg-light text-dark me-1">
                            {cuisine}
                          </span>
                        ))}
                      </div>
                      <div className="restaurant-footer mt-2">
                        <span className="delivery-fee">
                          <i className="bi bi-bicycle"></i> ${restaurant.deliveryFee}
                        </span>
                        {restaurant.minimumOrder > 0 && (
                          <span className="min-order text-muted">
                            Min ${restaurant.minimumOrder}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

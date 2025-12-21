import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart, useCartDispatch, getRestaurantId } from '../components/CartContext';
import Navbar from '../components/Navbar';
import Modal from '../Modal';
import './RestaurantDetail.css';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function RestaurantDetail() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [groupedMenu, setGroupedMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterFoodType, setFilterFoodType] = useState('all');

  const cart = useCart();
  const dispatch = useCartDispatch();

  useEffect(() => {
    loadRestaurantAndMenu();
  }, [id]);

  const loadRestaurantAndMenu = async () => {
    try {
      setLoading(true);
      
      // Load restaurant details
      const restResponse = await fetch(`${API_BASE}/restaurants/${id}`);
      const restData = await restResponse.json();
      
      if (restData.success) {
        setRestaurant(restData.restaurant);
      }

      // Load menu
      const menuResponse = await fetch(`${API_BASE}/menu/restaurant/${id}`);
      const menuData = await menuResponse.json();
      
      if (menuData.success) {
        setMenu(menuData.menuItems);
        setGroupedMenu(menuData.groupedMenu);
      }
    } catch (error) {
      console.error('Error loading restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    console.log('Adding item to cart:', item);
    
    // Check if cart has items from different restaurant
    const cartRestaurantId = getRestaurantId(cart);
    if (cartRestaurantId && cartRestaurantId !== id) {
      if (!window.confirm('Your cart contains items from another restaurant. Do you want to clear it?')) {
        return;
      }
      dispatch({ type: 'CLEAR_CART' });
    }

    if (item.variants && item.variants.length > 0) {
      setSelectedItem(item);
      setSelectedVariant(item.variants[0]);
      setSelectedAddons([]);
      setQuantity(1);
      setShowModal(true);
    } else {
      addItemToCart(item, null, [], 1);
    }
  };

  const addItemToCart = (item, variant, addons, qty) => {
    const cartItem = {
      _id: item._id,
      cartId: `${item._id}-${variant?.name || 'default'}-${Date.now()}`,
      restaurant: id,
      name: item.name,
      price: variant ? variant.price : item.price,
      selectedVariant: variant?.name || null,
      selectedAddons: addons,
      quantity: qty,
      image: item.image,
      foodType: item.foodType
    };

    console.log('Cart item created:', cartItem);
    dispatch({ type: 'ADD_TO_CART', item: cartItem });
    setShowModal(false);
    
    // Show success message
    alert(`${item.name} added to cart!`);
  };

  const handleAddonToggle = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.name === addon.name);
      if (exists) {
        return prev.filter(a => a.name !== addon.name);
      }
      return [...prev, addon];
    });
  };

  const calculateItemPrice = () => {
    let price = selectedVariant ? selectedVariant.price : selectedItem?.price || 0;
    const addonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    return (price + addonsPrice) * quantity;
  };

  const getFoodTypeIcon = (foodType) => {
    const colors = {
      'veg': '#22c55e',
      'non-veg': '#ef4444',
      'vegan': '#10b981',
      'egg': '#f59e0b'
    };
    return (
      <span className="food-type-indicator" style={{ borderColor: colors[foodType] }}>
        <span className="food-type-dot" style={{ backgroundColor: colors[foodType] }}></span>
      </span>
    );
  };

  const filteredMenu = menu.filter(item => {
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;
    if (filterFoodType !== 'all' && item.foodType !== filterFoodType) return false;
    return true;
  });

  const categories = [...new Set(menu.map(item => item.category))];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return <div className="container mt-5"><h3>Restaurant not found</h3></div>;
  }

  return (
    <div className="restaurant-detail-container">
      <Navbar />
      
      {/* Restaurant Header */}
      <div className="restaurant-header">
        <div className="restaurant-banner" style={{ backgroundImage: `url(${restaurant.bannerImage || 'https://via.placeholder.com/1200x300'})` }}>
          <div className="banner-overlay"></div>
        </div>
        <div className="container">
          <div className="restaurant-info-card">
            <div className="row">
              <div className="col-md-8">
                <h1>{restaurant.name}</h1>
                <p className="text-muted">{restaurant.description}</p>
                <div className="restaurant-meta">
                  <span className="badge bg-success">
                    <i className="bi bi-star-fill"></i> {restaurant.rating.toFixed(1)}
                  </span>
                  <span className="ms-3"><i className="bi bi-clock"></i> {restaurant.deliveryTime}</span>
                  <span className="ms-3"><i className="bi bi-bicycle"></i> ${restaurant.deliveryFee}</span>
                  {restaurant.isPureVeg && (
                    <span className="badge bg-success ms-3">Pure Veg</span>
                  )}
                </div>
                <div className="cuisine-list mt-2">
                  {restaurant.cuisineType.map((cuisine, idx) => (
                    <span key={idx} className="badge bg-light text-dark me-1">{cuisine}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container mt-4">
        <div className="row">
          {/* Menu Filters */}
          <div className="col-md-3">
            <div className="menu-filters sticky-top">
              <h5>Categories</h5>
              <div className="list-group">
                <button
                  className={`list-group-item list-group-item-action ${filterCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setFilterCategory('all')}
                >
                  All Items ({menu.length})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    className={`list-group-item list-group-item-action ${filterCategory === category ? 'active' : ''}`}
                    onClick={() => setFilterCategory(category)}
                  >
                    {category} ({menu.filter(item => item.category === category).length})
                  </button>
                ))}
              </div>

              <h5 className="mt-4">Food Type</h5>
              <div className="btn-group-vertical w-100">
                <button className={`btn ${filterFoodType === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilterFoodType('all')}>All</button>
                <button className={`btn ${filterFoodType === 'veg' ? 'btn-success' : 'btn-outline-success'}`} onClick={() => setFilterFoodType('veg')}>Veg</button>
                <button className={`btn ${filterFoodType === 'non-veg' ? 'btn-danger' : 'btn-outline-danger'}`} onClick={() => setFilterFoodType('non-veg')}>Non-Veg</button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="col-md-9">
            {filteredMenu.length === 0 ? (
              <div className="text-center">
                <h4>No items found</h4>
              </div>
            ) : (
              filteredMenu.map(item => (
                <div key={item._id} className="menu-item-card">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="d-flex align-items-start">
                        {getFoodTypeIcon(item.foodType)}
                        <div className="ms-2 flex-grow-1">
                          <h5 className="mb-1">{item.name}</h5>
                          {item.isBestseller && <span className="badge bg-warning text-dark me-1">Bestseller</span>}
                          {item.isRecommended && <span className="badge bg-info">Recommended</span>}
                          <p className="text-muted small mt-1">{item.description}</p>
                          <div className="mt-2">
                            <strong>${item.price}</strong>
                            {item.discount > 0 && (
                              <span className="text-success ms-2">{item.discount}% OFF</span>
                            )}
                          </div>
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-2">
                              {item.tags.map((tag, idx) => (
                                <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 text-end">
                      <div className="menu-item-image-container">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="menu-item-image" />
                        )}
                        <button
                          className="btn btn-primary btn-sm add-to-cart-btn"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                        >
                          {item.isAvailable ? 'ADD' : 'Not Available'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {showModal && selectedItem && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="customization-modal">
            <h4>{selectedItem.name}</h4>
            
            {selectedItem.variants && selectedItem.variants.length > 0 && (
              <div className="mt-3">
                <h6>Select Size</h6>
                {selectedItem.variants.map((variant, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="variant"
                      checked={selectedVariant?.name === variant.name}
                      onChange={() => setSelectedVariant(variant)}
                    />
                    <label className="form-check-label">
                      {variant.name} - ${variant.price}
                    </label>
                  </div>
                ))}
              </div>
            )}

            {selectedItem.addons && selectedItem.addons.length > 0 && (
              <div className="mt-3">
                <h6>Add-ons</h6>
                {selectedItem.addons.map((addon, idx) => (
                  <div key={idx} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={selectedAddons.some(a => a.name === addon.name)}
                      onChange={() => handleAddonToggle(addon)}
                    />
                    <label className="form-check-label">
                      {addon.name} - ${addon.price}
                    </label>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3">
              <h6>Quantity</h6>
              <div className="quantity-selector">
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span className="mx-3">{quantity}</span>
                <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-primary w-100"
                onClick={() => addItemToCart(selectedItem, selectedVariant, selectedAddons, quantity)}
              >
                Add to Cart - ${calculateItemPrice()}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React from 'react';
import { useCart, useCartDispatch } from '../components/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cart() {
  console.log('Cart component rendering');
  
  const cart = useCart();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  console.log('Cart state:', cart);

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    
    dispatch({
      type: 'UPDATE_QUANTITY',
      cartId: cartId,
      quantity: newQuantity
    });
  };

  const removeFromCart = (cartId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      cartId: cartId
    });
  };

  const getItemTotal = (item) => {
    return parseFloat(item.price) * parseInt(item.quantity);
  };

  const getCartCount = (cartItems) => {
    return cartItems.reduce((total, item) => total + parseInt(item.quantity), 0);
  };

  const getCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
  };

  // Check if cart is empty
  if (!cart || cart.length === 0) {
    console.log('Cart is empty');
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="text-center">
            <h2>Your Cart is Empty</h2>
            <p>Add some items to your cart to get started!</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/restaurants')}
            >
              Browse Restaurants
            </button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal(cart);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Your Cart ({getCartCount(cart)} items)</h2>
        
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            {cart.map((item) => (
              <div key={item.cartId} className="card mb-3">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      {item.img ? (
                        <img
                          src={item.img}
                          className="img-fluid rounded"
                          alt={item.name}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      ) : (
                        <div 
                          className="bg-light rounded d-flex align-items-center justify-content-center"
                          style={{ width: '80px', height: '80px' }}
                        >
                          <span className="text-muted small">No Image</span>
                        </div>
                      )}
                    </div>
                    <div className="col-md-4">
                      <h5>{item.name}</h5>
                      <p className="text-muted mb-0">Size: {item.selectedVariant || 'Regular'}</p>
                      <p className="text-success fw-bold">${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <div className="col-md-3">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.cartId, parseInt(item.quantity) - 1)}
                        >
                          -
                        </button>
                        <span className="mx-3 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => updateQuantity(item.cartId, parseInt(item.quantity) + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-md-3 text-end">
                      <div className="mb-2">
                        <strong className="text-success">${getItemTotal(item).toFixed(2)}</strong>
                      </div>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => removeFromCart(item.cartId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({getCartCount(cart)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => {
                    navigate('/payment', { state: { cartItems: cart, total } });
                  }}
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
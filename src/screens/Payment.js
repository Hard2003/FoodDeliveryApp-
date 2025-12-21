import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart, useCartDispatch, getCartTotal } from '../components/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useCart();
  const dispatch = useCartDispatch();
  const { user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Get order details from navigation state
  const orderData = location.state?.orderData;
  
  useEffect(() => {
    if (!orderData || !cart.length) {
      navigate('/cart');
    }
  }, [orderData, cart, navigate]);

  const handlePlaceOrder = async () => {
    setLoading(true);
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      alert('Please login to place order');
      navigate('/login');
      return;
    }

    try {
      const orderPayload = {
        restaurant: cart[0]?.restaurant,
        items: cart.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant,
          selectedAddons: item.selectedAddons
        })),
        deliveryAddress: orderData.selectedAddress,
        paymentMethod,
        totalAmount: orderData.grandTotal,
        deliveryFee: orderData.deliveryFee,
        taxes: orderData.taxes,
        deliveryInstructions: orderData.deliveryInstructions
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (data.success) {
        setOrderPlaced(true);
        dispatch({ type: 'CLEAR_CART' });
        
        // Show success message and redirect to orders
        setTimeout(() => {
          navigate('/myorders');
        }, 3000);
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (error) {
      console.error('Order placement error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="payment-container">
        <Navbar />
        <div className="order-success">
          <div className="success-icon">✅</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order has been confirmed and will be delivered soon.</p>
          <p>Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <Navbar />
      <div className="payment-content">
        <div className="payment-header">
          <h2>Complete Your Payment</h2>
          <p>Review your order and choose payment method</p>
        </div>

        <div className="payment-body">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="restaurant-name">{orderData.restaurantName}</div>
            
            <div className="order-items">
              {cart.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    {item.selectedVariant && (
                      <span className="item-variant"> - {item.selectedVariant}</span>
                    )}
                    {item.selectedAddons && item.selectedAddons.length > 0 && (
                      <div className="item-addons">
                        {item.selectedAddons.map((addon, idx) => (
                          <span key={idx} className="addon">+ {addon.name}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="item-price">
                    {item.quantity} x ₹{item.price.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="delivery-address">
              <h4>Delivery Address</h4>
              <div className="address">
                <div>{orderData.selectedAddress.addressType.toUpperCase()}</div>
                <div>{orderData.selectedAddress.houseNo} {orderData.selectedAddress.street}</div>
                <div>{orderData.selectedAddress.area}, {orderData.selectedAddress.city}</div>
                <div>{orderData.selectedAddress.state} - {orderData.selectedAddress.pincode}</div>
              </div>
            </div>

            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>₹{orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Delivery Fee:</span>
                <span>₹{orderData.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Taxes & Fees:</span>
                <span>₹{orderData.taxes.toFixed(2)}</span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>₹{orderData.grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Choose Payment Method</h3>
            
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-info">
                  <div className="payment-name">Cash on Delivery</div>
                  <div className="payment-desc">Pay when your order arrives</div>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-info">
                  <div className="payment-name">UPI Payment</div>
                  <div className="payment-desc">Pay using UPI apps</div>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-info">
                  <div className="payment-name">Credit/Debit Card</div>
                  <div className="payment-desc">Pay using your card</div>
                </div>
              </label>
            </div>

            {paymentMethod === 'upi' && (
              <div className="upi-section">
                <p>You will be redirected to your UPI app to complete payment</p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <div className="card-section">
                <p>You will be redirected to our secure payment gateway</p>
              </div>
            )}
          </div>

          <div className="payment-actions">
            <button 
              className="btn btn-ghost btn-lg"
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </button>
            <button
              className="btn btn-primary btn-lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : `Place Order - ₹${orderData.grandTotal.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
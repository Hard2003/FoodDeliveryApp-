import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './components/CartContext';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';

// Import Design System
import './styles/design-system.css';
import './styles/components.css';
import './App.css';

// Import Screens
import Landing from './screens/Landing';
import Login from './screens/Login';
import Signup from './screens/Signup';
import RestaurantList from './screens/RestaurantList';
import RestaurantDetail from './screens/RestaurantDetail';
import Cart from './screens/Cart';
import Payment from './screens/Payment';
import MyOrder from './screens/MyOrder';
import Home from './screens/Home';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              
              {/* Customer Dashboard - redirects authenticated users to restaurants */}
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <RestaurantList />
                  </ProtectedRoute>
                } 
              />
              
              {/* Auth Routes */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute redirectTo="/restaurants">
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute redirectTo="/restaurants">
                    <Signup />
                  </PublicRoute>
                } 
              />
              
              {/* Protected Routes */}
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payment" 
                element={
                  <ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/myorders" 
                element={
                  <ProtectedRoute>
                    <MyOrder />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback */}
              <Route path="/unauthorized" element={<div className="container"><h2>Unauthorized Access</h2></div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

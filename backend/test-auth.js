// Backend Authentication Test
// Run with: node test-auth.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/FoodDelivery')
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    console.log('🔗 Connection String:', process.env.MONGO_URI || 'mongodb://localhost:27017/FoodDelivery');
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
  });

// Test User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['customer', 'restaurant_partner', 'delivery_partner', 'admin', 'support_admin'],
    default: 'customer'
  },
  location: { type: String },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Test route to verify connection
app.get('/test', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    res.json({
      success: true,
      message: 'Database connection working',
      userCount,
      database: mongoose.connection.name,
      state: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database error',
      error: error.message
    });
  }
});

// Test registration route
app.post('/test-register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create test user
    const user = new User({
      name: name || 'Test User',
      email: email || `test${Date.now()}@example.com`,
      password: password || 'testpassword123', // In real app, this should be hashed
      phone: phone || '+1234567890',
      role: role || 'customer'
    });

    await user.save();
    
    res.json({
      success: true,
      message: 'Test user created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration test failed',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📊 Test connection: GET http://localhost:${PORT}/test`);
  console.log(`🔐 Test registration: POST http://localhost:${PORT}/test-register`);
  console.log('\n--- Environment Check ---');
  console.log(`MONGO_URI: ${process.env.MONGO_URI ? '✅ Set' : '❌ Not set'}`);
  console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Not set'}`);
  console.log(`NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Food Delivery API - Test Mode',
    version: '2.0',
    status: 'running'
  });
});

// Test API Routes
try {
  app.use('/api/auth', require('./Routes/Auth'));
  console.log('✅ Auth routes loaded');
} catch (error) {
  console.log('❌ Error loading Auth routes:', error.message);
}

try {
  app.use('/api/restaurants', require('./Routes/Restaurant'));
  console.log('✅ Restaurant routes loaded');
} catch (error) {
  console.log('❌ Error loading Restaurant routes:', error.message);
}

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});
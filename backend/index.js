require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// Database connection
global.foodData = require('./db')(function (err, data, CatData) {
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
});

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
    message: 'Food Delivery API',
    version: '2.0',
    status: 'running'
  });
});

// API Routes
app.use('/api/auth', require('./Routes/Auth'));
app.use('/api/restaurants', require('./Routes/Restaurant'));
app.use('/api/menu', require('./Routes/Menu'));
app.use('/api/orders', require('./Routes/Order'));
app.use('/api/addresses', require('./Routes/Address'));

// Error Handler (must be last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});


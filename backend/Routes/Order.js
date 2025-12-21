const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

// Customer routes
router.post('/',
  protect,
  orderController.createOrderValidation,
  validate,
  orderController.createOrder
);

router.get('/my-orders',
  protect,
  orderController.getMyOrders
);

router.post('/:id/cancel',
  protect,
  orderController.cancelOrder
);

// Restaurant owner routes
router.get('/restaurant/orders',
  protect,
  authorize('restaurant_owner', 'admin'),
  orderController.getRestaurantOrders
);

// Order details (accessible by customer, restaurant, delivery partner, admin)
router.get('/:id',
  protect,
  orderController.getOrderById
);

// Update order status (restaurant owner, delivery partner, admin)
router.patch('/:id/status',
  protect,
  authorize('restaurant_owner', 'delivery_partner', 'admin'),
  orderController.updateOrderStatus
);

// Admin routes
router.get('/',
  protect,
  authorize('admin'),
  orderController.getAllOrders
);

module.exports = router;

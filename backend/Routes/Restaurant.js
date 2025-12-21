const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

// Public routes
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

// Protected routes (Restaurant Owner)
router.post('/',
  protect,
  authorize('restaurant_partner', 'admin'),
  restaurantController.createRestaurantValidation,
  validate,
  restaurantController.createRestaurant
);

router.get('/my/restaurant',
  protect,
  authorize('restaurant_partner', 'admin'),
  restaurantController.getMyRestaurant
);

router.put('/:id',
  protect,
  authorize('restaurant_partner', 'admin'),
  restaurantController.updateRestaurant
);

router.patch('/:id/toggle-status',
  protect,
  authorize('restaurant_partner', 'admin'),
  restaurantController.toggleRestaurantStatus
);

// Admin only routes
router.patch('/:id/approve',
  protect,
  authorize('admin'),
  restaurantController.approveRestaurant
);

router.delete('/:id',
  protect,
  authorize('admin'),
  restaurantController.deleteRestaurant
);

module.exports = router;

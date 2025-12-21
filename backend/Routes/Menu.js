const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');
const validate = require('../middleware/validator');

// Public routes
router.get('/restaurant/:restaurantId', menuController.getMenuByRestaurant);
router.get('/:id', menuController.getMenuItemById);

// Protected routes (Restaurant Owner)
router.post('/',
  protect,
  authorize('restaurant_partner', 'admin'),
  menuController.createMenuItemValidation,
  validate,
  menuController.createMenuItem
);

router.get('/my/menu',
  protect,
  authorize('restaurant_partner', 'admin'),
  menuController.getMyRestaurantMenu
);

router.put('/:id',
  protect,
  authorize('restaurant_partner', 'admin'),
  menuController.updateMenuItem
);

router.delete('/:id',
  protect,
  authorize('restaurant_partner', 'admin'),
  menuController.deleteMenuItem
);

router.patch('/:id/toggle-availability',
  protect,
  authorize('restaurant_partner', 'admin'),
  menuController.toggleAvailability
);

module.exports = router;

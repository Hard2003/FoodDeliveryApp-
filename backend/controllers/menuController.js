const MenuItem = require('../models/MenuItem');
const Restaurant = require('../models/Restaurant');
const { body } = require('express-validator');

// Validation
exports.createMenuItemValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Item name required'),
  body('description').notEmpty().withMessage('Description required'),
  body('category').notEmpty().withMessage('Category required'),
  body('foodType').isIn(['veg', 'non-veg', 'vegan', 'egg']).withMessage('Valid food type required'),
  body('price').isNumeric().withMessage('Price must be a number')
];

// Create menu item
exports.createMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found for this user'
      });
    }

    const menuItem = await MenuItem.create({
      ...req.body,
      restaurant: restaurant._id
    });

    res.status(201).json({
      success: true,
      message: 'Menu item created successfully',
      menuItem
    });
  } catch (error) {
    console.error('Create menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all menu items by restaurant
exports.getMenuByRestaurant = async (req, res) => {
  try {
    const { category, foodType, search, isAvailable } = req.query;

    let query = { restaurant: req.params.restaurantId };

    if (category) query.category = category;
    if (foodType) query.foodType = foodType;
    if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';
    if (search) query.$text = { $search: search };

    const menuItems = await MenuItem.find(query).sort({ category: 1, name: 1 });

    // Group by category
    const groupedMenu = menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      menuItems,
      groupedMenu
    });
  } catch (error) {
    console.error('Get menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single menu item
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant', 'name');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    res.json({
      success: true,
      menuItem
    });
  } catch (error) {
    console.error('Get menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Check ownership
    if (menuItem.restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Menu item updated successfully',
      menuItem: updatedMenuItem
    });
  } catch (error) {
    console.error('Update menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Check ownership
    if (menuItem.restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await menuItem.remove();

    res.json({
      success: true,
      message: 'Menu item deleted successfully'
    });
  } catch (error) {
    console.error('Delete menu item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle availability
exports.toggleAvailability = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('restaurant');

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Check ownership
    if (menuItem.restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    res.json({
      success: true,
      message: `Menu item ${menuItem.isAvailable ? 'available' : 'unavailable'}`,
      menuItem
    });
  } catch (error) {
    console.error('Toggle availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get my restaurant menu
exports.getMyRestaurantMenu = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const menuItems = await MenuItem.find({ restaurant: restaurant._id }).sort({ category: 1, name: 1 });

    res.json({
      success: true,
      menuItems
    });
  } catch (error) {
    console.error('Get my menu error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

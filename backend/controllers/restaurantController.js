const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const { body } = require('express-validator');

// Validation rules
exports.createRestaurantValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Restaurant name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('phone').isMobilePhone().withMessage('Please provide a valid phone number'),
  body('description').notEmpty().withMessage('Description is required'),
  body('cuisineType').isArray({ min: 1 }).withMessage('At least one cuisine type is required'),
  body('fssaiLicense').notEmpty().withMessage('FSSAI License is required')
];

// Register/Create Restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const {
      name, email, phone, description, cuisineType, logo, bannerImage,
      address, location, operatingHours, deliveryTime, minimumOrder,
      deliveryRadius, deliveryFee, isPureVeg, fssaiLicense, gstNumber, bankDetails
    } = req.body;

    // Check if restaurant already exists
    const existingRestaurant = await Restaurant.findOne({ email });
    if (existingRestaurant) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant with this email already exists'
      });
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      name,
      owner: req.user.id,
      email,
      phone,
      description,
      cuisineType,
      logo,
      bannerImage,
      address,
      location,
      operatingHours,
      deliveryTime,
      minimumOrder,
      deliveryRadius,
      deliveryFee,
      isPureVeg,
      fssaiLicense,
      gstNumber,
      bankDetails,
      isApproved: false // Admin needs to approve
    });

    // Update user's restaurant reference
    await User.findByIdAndUpdate(req.user.id, {
      restaurant: restaurant._id,
      role: 'restaurant_partner'
    });

    res.status(201).json({
      success: true,
      message: 'Restaurant registered successfully. Awaiting admin approval.',
      restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all restaurants with filters
exports.getAllRestaurants = async (req, res) => {
  try {
    const {
      search, cuisine, isVeg, minRating, sortBy, page = 1, limit = 10,
      latitude, longitude, radius = 10
    } = req.query;

    // Allow skipping approval gating in dev by setting REQUIRE_RESTAURANT_APPROVAL=false
    const requireApproval = process.env.REQUIRE_RESTAURANT_APPROVAL !== 'false';

    let query = { isActive: true };
    if (requireApproval) {
      query.isApproved = true;
    }

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Cuisine filter
    if (cuisine) {
      query.cuisineType = { $in: [cuisine] };
    }

    // Pure veg filter
    if (isVeg === 'true') {
      query.isPureVeg = true;
    }

    // Rating filter
    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    // Location-based search
    if (latitude && longitude) {
      query.location = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: radius * 1000 // Convert km to meters
        }
      };
    }

    // Sorting
    let sort = {};
    switch (sortBy) {
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'deliveryTime':
        sort = { deliveryTime: 1 };
        break;
      case 'deliveryFee':
        sort = { deliveryFee: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }

    const restaurants = await Restaurant.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-bankDetails -gstNumber');

    const count = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      restaurants,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .select('-bankDetails -gstNumber');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      restaurant
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update restaurant (Owner only)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check ownership
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this restaurant'
      });
    }

    const updatedRestaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Restaurant updated successfully',
      restaurant: updatedRestaurant
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete restaurant (Admin only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    await restaurant.remove();

    res.json({
      success: true,
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Approve restaurant (Admin only)
exports.approveRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      message: 'Restaurant approved successfully',
      restaurant
    });
  } catch (error) {
    console.error('Approve restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get my restaurant (Owner)
exports.getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'No restaurant found for this user'
      });
    }

    res.json({
      success: true,
      restaurant
    });
  } catch (error) {
    console.error('Get my restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Toggle restaurant active status
exports.toggleRestaurantStatus = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    // Check ownership
    if (restaurant.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    restaurant.isActive = !restaurant.isActive;
    await restaurant.save();

    res.json({
      success: true,
      message: `Restaurant ${restaurant.isActive ? 'activated' : 'deactivated'} successfully`,
      restaurant
    });
  } catch (error) {
    console.error('Toggle status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

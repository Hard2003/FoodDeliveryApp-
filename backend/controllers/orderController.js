const Order = require('../models/Orders');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Address = require('../models/Address');
const { body } = require('express-validator');

// Generate order number
const generateOrderNumber = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7);
  return `ORD-${timestamp}-${randomStr}`.toUpperCase();
};

// Validation
exports.createOrderValidation = [
  body('restaurant').notEmpty().withMessage('Restaurant is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('deliveryAddress').notEmpty().withMessage('Delivery address is required'),
  body('paymentMethod').isIn(['card', 'upi', 'wallet', 'netbanking', 'cod']).withMessage('Valid payment method required')
];

// Create order
exports.createOrder = async (req, res) => {
  try {
    const {
      restaurant, items, deliveryAddress, pricing,
      paymentMethod, coupon, specialInstructions, contactlessDelivery
    } = req.body;

    // Validate restaurant
    const restaurantData = await Restaurant.findById(restaurant);
    if (!restaurantData || !restaurantData.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant is not available'
      });
    }

    // Validate address
    const address = await Address.findById(deliveryAddress);
    if (!address || address.user.toString() !== req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid delivery address'
      });
    }

    // Calculate estimated delivery time (30 mins from now)
    const estimatedDeliveryTime = new Date(Date.now() + 30 * 60 * 1000);

    // Create order
    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      customer: req.user.id,
      restaurant,
      items,
      deliveryAddress,
      deliveryLocation: address.location,
      pricing,
      coupon,
      paymentMethod,
      specialInstructions,
      contactlessDelivery,
      estimatedDeliveryTime,
      statusHistory: [{
        status: 'placed',
        timestamp: new Date(),
        note: 'Order placed successfully'
      }]
    });

    // Update restaurant order count
    await Restaurant.findByIdAndUpdate(restaurant, {
      $inc: { totalOrders: 1 }
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get customer orders
exports.getMyOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    let query = { customer: req.user.id };
    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .populate('restaurant', 'name logo phone')
      .populate('deliveryAddress')
      .populate('deliveryPartner', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get restaurant orders
exports.getRestaurantOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ owner: req.user.id });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    const { status, page = 1, limit = 20 } = req.query;

    let query = { restaurant: restaurant._id };
    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .populate('customer', 'name phone')
      .populate('deliveryAddress')
      .populate('deliveryPartner', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get restaurant orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name phone email')
      .populate('restaurant', 'name logo phone address')
      .populate('deliveryAddress')
      .populate('deliveryPartner', 'name phone vehicleNumber')
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    const restaurant = await Restaurant.findById(order.restaurant);
    if (
      order.customer.toString() !== req.user.id &&
      restaurant.owner.toString() !== req.user.id &&
      order.deliveryPartner?.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id).populate('restaurant');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    const canUpdate = (
      order.restaurant.owner.toString() === req.user.id ||
      order.deliveryPartner?.toString() === req.user.id ||
      req.user.role === 'admin'
    );

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note
    });

    if (status === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Only allow cancellation for placed/confirmed orders
    if (!['placed', 'confirmed'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Check authorization
    if (order.customer.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    order.orderStatus = 'cancelled';
    order.cancellationReason = reason;
    order.cancelledBy = req.user.id;
    order.statusHistory.push({
      status: 'cancelled',
      timestamp: new Date(),
      note: reason
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get all orders (Admin)
exports.getAllOrders = async (req, res) => {
  try {
    const { status, page = 1, limit = 20, search } = req.query;

    let query = {};
    if (status) query.orderStatus = status;
    if (search) query.orderNumber = new RegExp(search, 'i');

    const orders = await Order.find(query)
      .populate('customer', 'name phone')
      .populate('restaurant', 'name')
      .populate('deliveryPartner', 'name phone')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

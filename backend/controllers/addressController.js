const Address = require('../models/Address');
const { body } = require('express-validator');

// Validation
exports.createAddressValidation = [
  body('label').notEmpty().withMessage('Address label is required'),
  body('addressLine1').notEmpty().withMessage('Address line 1 is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State is required'),
  body('pincode').notEmpty().withMessage('Pincode is required'),
  body('location.coordinates').isArray({ min: 2, max: 2 }).withMessage('Valid coordinates required')
];

// Create address
exports.createAddress = async (req, res) => {
  try {
    const address = await Address.create({
      ...req.body,
      user: req.user.id
    });

    // If this is the first address or marked as default, set it as default
    if (req.body.isDefault) {
      await Address.updateMany(
        { user: req.user.id, _id: { $ne: address._id } },
        { isDefault: false }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      address
    });
  } catch (error) {
    console.error('Create address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get user addresses
exports.getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({ isDefault: -1, createdAt: -1 });

    res.json({
      success: true,
      addresses
    });
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get single address
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check ownership
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      address
    });
  } catch (error) {
    console.error('Get address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Update address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check ownership
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // If setting as default, unset other defaults
    if (req.body.isDefault) {
      await Address.updateMany(
        { user: req.user.id, _id: { $ne: req.params.id } },
        { isDefault: false }
      );
    }

    res.json({
      success: true,
      message: 'Address updated successfully',
      address: updatedAddress
    });
  } catch (error) {
    console.error('Update address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Delete address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check ownership
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await address.remove();

    res.json({
      success: true,
      message: 'Address deleted successfully'
    });
  } catch (error) {
    console.error('Delete address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Set default address
exports.setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: 'Address not found'
      });
    }

    // Check ownership
    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Unset all other defaults
    await Address.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    // Set this as default
    address.isDefault = true;
    await address.save();

    res.json({
      success: true,
      message: 'Default address set successfully',
      address
    });
  } catch (error) {
    console.error('Set default address error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

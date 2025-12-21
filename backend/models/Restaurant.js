const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cuisineType: [{
    type: String,
    required: true
  }],
  logo: {
    type: String,
    default: ''
  },
  bannerImage: {
    type: String,
    default: ''
  },
  images: [{
    type: String
  }],
  address: {
    addressLine1: String,
    addressLine2: String,
    landmark: String,
    city: String,
    state: String,
    pincode: String
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  operatingHours: {
    monday: { open: String, close: String, isOpen: Boolean },
    tuesday: { open: String, close: String, isOpen: Boolean },
    wednesday: { open: String, close: String, isOpen: Boolean },
    thursday: { open: String, close: String, isOpen: Boolean },
    friday: { open: String, close: String, isOpen: Boolean },
    saturday: { open: String, close: String, isOpen: Boolean },
    sunday: { open: String, close: String, isOpen: Boolean }
  },
  deliveryTime: {
    type: String,
    default: '30-40 mins'
  },
  minimumOrder: {
    type: Number,
    default: 0
  },
  deliveryRadius: {
    type: Number,
    default: 5 // in kilometers
  },
  deliveryFee: {
    type: Number,
    default: 30
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  totalOrders: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  isPureVeg: {
    type: Boolean,
    default: false
  },
  fssaiLicense: {
    type: String,
    required: true
  },
  gstNumber: String,
  bankDetails: {
    accountName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  commissionRate: {
    type: Number,
    default: 15 // percentage
  }
}, {
  timestamps: true
});

restaurantSchema.index({ location: '2dsphere' });
restaurantSchema.index({ name: 'text', cuisineType: 'text', description: 'text' });

module.exports = mongoose.model('Restaurant', restaurantSchema);

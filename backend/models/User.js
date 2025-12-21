const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: ['customer', 'restaurant_partner', 'delivery_partner', 'admin', 'support_admin'],
    default: 'customer'
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  phoneOtp: {
    type: String
  },
  phoneOtpExpires: {
    type: Date
  },
  refreshToken: {
    type: String
  },
  lastLogin: {
    type: Date
  },
  profileImage: {
    type: String,
    default: ''
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  addresses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address'
  }],
  favoriteRestaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  // For delivery partners
  vehicleType: {
    type: String,
    enum: ['bike', 'car', 'bicycle'],
  },
  vehicleNumber: String,
  drivingLicense: String,
  isAvailable: {
    type: Boolean,
    default: false
  },
  currentLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0]
    }
  },
  totalDeliveries: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  earnings: {
    type: Number,
    default: 0
  },
  // For restaurant owners
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerificationToken: String,
  emailVerificationExpires: Date
}, {
  timestamps: true
});

userSchema.index({ 'currentLocation': '2dsphere' });

module.exports = mongoose.model('user', userSchema);
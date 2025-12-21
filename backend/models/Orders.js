const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  items: [{
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: Number,
    variant: String,
    addons: [{
      name: String,
      price: Number
    }],
    specialInstructions: String
  }],
  deliveryAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  deliveryLocation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true
    },
    deliveryFee: {
      type: Number,
      default: 0
    },
    taxAmount: {
      type: Number,
      default: 0
    },
    discount: {
      type: Number,
      default: 0
    },
    packagingCharges: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      required: true
    }
  },
  coupon: {
    code: String,
    discountAmount: Number
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'upi', 'wallet', 'netbanking', 'cod'],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: String,
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'preparing', 'ready', 'picked_up', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'placed'
  },
  statusHistory: [{
    status: String,
    timestamp: Date,
    note: String
  }],
  estimatedDeliveryTime: Date,
  actualDeliveryTime: Date,
  cancellationReason: String,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  specialInstructions: String,
  contactlessDelivery: {
    type: Boolean,
    default: false
  },
  rating: {
    foodRating: Number,
    deliveryRating: Number,
    review: String,
    reviewDate: Date
  },
  restaurantEarnings: Number,
  deliveryPartnerEarnings: Number,
  platformCommission: Number
}, {
  timestamps: true
});

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ restaurant: 1, createdAt: -1 });
orderSchema.index({ deliveryPartner: 1, orderStatus: 1 });

module.exports = mongoose.model('order', orderSchema);
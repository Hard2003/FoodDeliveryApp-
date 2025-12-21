const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  deliveryPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  foodRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  deliveryRating: {
    type: Number,
    min: 1,
    max: 5
  },
  reviewText: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  isReported: {
    type: Boolean,
    default: false
  },
  reportReason: String,
  isVisible: {
    type: Boolean,
    default: true
  },
  response: {
    text: String,
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: Date
  }
}, {
  timestamps: true
});

reviewSchema.index({ restaurant: 1, createdAt: -1 });
reviewSchema.index({ customer: 1 });

module.exports = mongoose.model('Review', reviewSchema);

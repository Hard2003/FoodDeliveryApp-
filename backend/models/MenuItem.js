const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  foodType: {
    type: String,
    enum: ['veg', 'non-veg', 'vegan', 'egg'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  variants: [{
    name: String, // e.g., "Small", "Medium", "Large"
    price: Number
  }],
  addons: [{
    name: String,
    price: Number
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  isRecommended: {
    type: Boolean,
    default: false
  },
  isBestseller: {
    type: Boolean,
    default: false
  },
  preparationTime: {
    type: String,
    default: '15-20 mins'
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
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  tags: [{
    type: String
  }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  allergens: [{
    type: String
  }],
  servesCount: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

menuItemSchema.index({ restaurant: 1, category: 1 });
menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);

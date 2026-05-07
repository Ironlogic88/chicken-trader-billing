const mongoose = require('mongoose');

const dailyRateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    date: {
      type: Date,
      required: true,
      default: Date.now
    },
    chickenType: {
      type: String,
      enum: ['broiler', 'layer', 'mixed'],
      required: true
    },
    quality: {
      type: String,
      enum: ['A', 'B', 'C'],
      default: 'A'
    },
    buyingRate: {
      type: Number,
      required: [true, 'Please provide buying rate'],
      min: [0.01, 'Rate must be greater than 0']
    },
    sellingRate: {
      type: Number,
      required: [true, 'Please provide selling rate'],
      min: [0.01, 'Rate must be greater than 0']
    },
    marketStatus: {
      type: String,
      enum: ['high', 'normal', 'low'],
      default: 'normal'
    },
    notes: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Ensure unique date, chickenType, quality combination
dailyRateSchema.index({ date: 1, chickenType: 1, quality: 1 }, { unique: true });

module.exports = mongoose.model('DailyRate', dailyRateSchema);

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
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
    category: {
      type: String,
      enum: ['fuel', 'wages', 'transport', 'utilities', 'maintenance', 'rent', 'food', 'medicine', 'other'],
      required: [true, 'Please provide expense category']
    },
    description: {
      type: String,
      required: [true, 'Please provide description']
    },
    amount: {
      type: Number,
      required: [true, 'Please provide amount'],
      min: [0.01, 'Amount must be greater than 0']
    },
    paidTo: {
      type: String,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'cheque', 'bank_transfer', 'card'],
      default: 'cash'
    },
    referenceNumber: String,
    receipt: {
      url: String,
      fileName: String
    },
    notes: String,
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

// Index for queries
expenseSchema.index({ date: 1, category: 1 });
expenseSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Expense', expenseSchema);

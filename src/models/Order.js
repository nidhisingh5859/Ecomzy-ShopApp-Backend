// Import Mongoose
const mongoose = require('mongoose');

// Define the schema for the Order model
const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true, // Ensures orderId is unique
  },
  orderName: {
    type: String,
  },
  itemId: [{ // Use an array for item IDs
    type: String,
  }],
  itemPrice: [{ // Use an array for item prices
    type: String,
  }],
  fullName: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
    default: '', // Optional field, defaults to empty string if not provided
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create the Order model based on the schema
const Order = mongoose.model('Order', OrderSchema);

// Export the Order model to use in other files
module.exports = Order;

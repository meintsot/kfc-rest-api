const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerAddress: {
        type: String,
        required: true,
        trim: true
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    items: [orderItemSchema],
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    expectedDeliveryTime: {
        type: Date
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

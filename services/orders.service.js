require('dotenv').config();
const { Order } = require('../models');

const LATEST_ORDERS_LIMIT = parseInt(process.env.LATEST_ORDERS_LIMIT) || 10;

const saveOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
    console.log('Order saved successfully');

    return newOrder.populate({
        path: 'items.item',
        select: '-_id'
    });
};

const retrieveRecentOrders = async (offset) => {
    return await Order.find()
        .select('-__v -items._id')
        .populate({
            path: 'items.item',
            select: '-_id'
        })
        .sort({ orderDate: -1 })
        .skip(offset)
        .limit(LATEST_ORDERS_LIMIT);
};

module.exports = {
    saveOrder,
    retrieveRecentOrders
};

const express = require('express');
const ordersRouter = express.Router();
const { ordersController } = require('../controllers');

ordersRouter.get('/', ordersController.retrieveRecentOrders);

module.exports = ordersRouter;
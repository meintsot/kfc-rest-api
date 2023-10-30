const express = require('express');
const itemsRouter = express.Router();
const { itemsController } = require('../controllers');

itemsRouter.get('/', itemsController.getAllItems);

module.exports = itemsRouter;

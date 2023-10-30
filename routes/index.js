const express = require('express');
const router = express.Router();
const itemsRouter = require('./items.route');
const ordersRouter = require('./orders.route');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = {
  router,
  itemsRouter,
  ordersRouter
};

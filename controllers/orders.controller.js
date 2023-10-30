const { ordersService} = require('../services');

const retrieveRecentOrders = async (req, res) => {
    const { offset = 0 } = req.query; // Destructure and provide default values
    const orders = await ordersService.retrieveRecentOrders(Number(offset));
    res.send(orders);
};


module.exports = {
    retrieveRecentOrders
};
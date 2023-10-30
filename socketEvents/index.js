const { ordersService } = require('../services');

const onOrderPlace = async (socket, order) => {

    try {
        // Save the order in the database
        const newOrder = await ordersService.saveOrder(order);

        // Emit a confirmation back to the client
        socket.emit('order-confirmation', { status: 'success', orderId: newOrder._id });

        // Broadcast to the client (the merchant page)
        socket.broadcast.emit('receive-order', newOrder);
    } catch (error) {
        console.error('Error saving order:', error);

        // Emit an error back to the client
        socket.emit('order-confirmation', { status: 'error', message: 'Failed to place order' });
    }
};

module.exports = {
    onOrderPlace
};

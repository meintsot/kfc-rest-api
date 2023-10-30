const { Item } = require('../models');

const getAllItems = async () => {
    return Item.find();
};

module.exports = {
    getAllItems
};

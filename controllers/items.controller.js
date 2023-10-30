const { itemsService, currencyService } = require('../services');

const getAllItems = async (req, res) => {
    const items = await itemsService.getAllItems();
    const itemsWithConvertedAmounts = await currencyService.getItemsWithConvertedAmounts(items);

    const groupedByCategory = itemsWithConvertedAmounts.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {});

    res.send(groupedByCategory);
};


module.exports = {
    getAllItems
};

const normalizePrice = (price) => {
    return parseFloat(price.toFixed(2));
};

module.exports = normalizePrice;
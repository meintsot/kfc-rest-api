const axios = require('axios');
const normalizePrice = require('../utils/normalizePrice');

const API_KEY = process.env.FIXER_IO_ACCESS_KEY;
const CONVERT_URL = "http://data.fixer.io/api/latest";
const BASE_CURRENCY = "EUR";
const CURRENCIES = "USD,JPY,GBP,CNY,CHF,CAD"

const getItemsWithConvertedAmounts = async (items) => {
    const params = {access_key: API_KEY, base: BASE_CURRENCY, symbols: CURRENCIES};
    const res = await axios.get(CONVERT_URL, { params });
    console.log(res.data);
    if (res.data.rates) {
        const rates = res.data.rates;

        return items.map(item => {
            const price = item.price;

            return {
                _id: item._id,
                name: item.name,
                description: item.description,
                calories: item.calories,
                category: item.category,
                price: {
                    EUR: price,
                    USD: normalizePrice(price * rates.USD),
                    JPY: normalizePrice(price * rates.JPY),
                    GBP: normalizePrice(price * rates.GBP),
                    CNY: normalizePrice(price * rates.CNY),
                    CHF: normalizePrice(price * rates.CHF),
                    CAD: normalizePrice(price * rates.CAD)
                }
            };
        });
    }
};

module.exports = {
    getItemsWithConvertedAmounts
};

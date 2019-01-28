const Product = require('../models/Product');

module.exports.index = (req, res) => {
    let queryData = req.query;

    Product.find({buyer: null})
        .populate('category')
        .then((products) => {
            let data = {
                products
            };

            if (req.query.error) {
                data.error = req.query.error;
            } else if (req.query.success) {
                data.success = req.query.success;
            }

            if (queryData.query) {
                products = products.filter(x => x.name.toLowerCase().includes(queryData.query));
            }

            res.render('home/index', {
                products: products,
                error: data.error,
                success: data.success
            });
        });
};
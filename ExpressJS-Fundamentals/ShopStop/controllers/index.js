const homeController = require('./home');
const productController = require('./product');
const categoryController = require('./category');
const registerController = require('./user');

module.exports = {
    home: homeController,
    product: productController,
    category: categoryController,
    user: registerController
};
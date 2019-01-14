const homeHandler = require('./home');
const filesHandler = require('./static-files');
let productHandler = require('./product');

module.exports = [homeHandler, filesHandler, productHandler];
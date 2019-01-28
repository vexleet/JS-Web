const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
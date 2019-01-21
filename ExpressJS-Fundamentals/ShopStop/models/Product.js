const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String},
    price: {
        type: Schema.Types.Number,
        min: 0,
        max: Number.MAX_VALUE,
        default: 0
    },
    image: {type: Schema.Types.String},
    isBought: {type: mongoose.Schema.Types.Boolean, default: false},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
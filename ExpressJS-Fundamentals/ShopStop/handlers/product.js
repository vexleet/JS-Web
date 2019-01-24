const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.addGet = (req, res) => {
    Category.find()
        .then((categories) => {
            res.render('product/add', {categories: categories});
        });
};

module.exports.addPost = async (req, res) => {
    let productObj = req.body;
    productObj.image = '\\' + req.file.path;

    let product = await Product.create(productObj);
    let category = await Category.findById(product.category);

    category.products.push(product._id);
    category.save();
    res.redirect('/');
};

module.exports.editGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .then((product) => {
            if (!product) {
                res.status(404);
                res.send('Product not found!');
                return;
            }

            Category.find()
                .then((categories) => {
                    res.render('product/edit', {
                        product: product,
                        categories: categories
                    });
                });
        });
};

module.exports.editPost = async (req, res) => {
    let id = req.params.id;
    let editedProduct = req.body;

    let product = await Product.findById(id);

    if (!product) {
        res.redirect(`/?error=${encodeURIComponent('Product was not found!')}`);
        return;
    }

    product.name = editedProduct.name;
    product.description = editedProduct.description;
    product.price = editedProduct.price;

    if (req.file) {
        product.image = '\\' + req.file.path;
    }

    if (product.category.toString() !== editedProduct.category) {
        Category.findById(product.category)
            .then((currentCategory) => {
                Category.findById(editedProduct.category)
                    .then((nextCategory) => {
                        let index = currentCategory.products.indexOf(product._id);
                        if (index >= 0) {
                            currentCategory.products.splice(index, 1);
                        }
                        currentCategory.save();

                        nextCategory.products.push(product._id);
                        nextCategory.save();

                        product.category = editedProduct.category;

                        product.save()
                            .then(() => {
                                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully')}`);
                            });
                    });
            });
    } else {
        product.save()
            .then(() => {
                res.redirect(`/?success=${encodeURIComponent('Product was edited successfully')}`);
            });
    }
};

module.exports.deleteGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .then((product) => {
            if (!product) {
                res.status(404);
                res.send('Product not found!');
                return;
            }

            res.render('product/delete', {
                product: product,
            });
        });
};

module.exports.deletePost = async (req, res) => {
    let id = req.params.id;

    let product = await Product.findByIdAndDelete(id);

    Category.findById(product.category)
        .then((category) => {
            let index = category.products.indexOf(product._id);

            if (index >= 0) {
                category.products.splice(index, 1);
            }

            category.save()
                .then(() => {
                    res.redirect(`/?success=${encodeURIComponent('Product was deleted successfully')}`);
                });
        });
};

module.exports.buyGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .then((product) => {
            if(!product){
                res.status(404);
                res.send('Product was not found!');
            }

            res.render('product/buy', {
                product: product
            });
        });
};





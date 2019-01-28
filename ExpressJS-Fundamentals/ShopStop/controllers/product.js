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
    productObj.creator = req.user._id;

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

            if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
                Category.find()
                    .then((categories) => {
                        res.render('product/edit', {
                            product: product,
                            categories: categories
                        });
                    });
            }
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

    if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
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
            if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
                res.render('product/delete', {
                    product: product,
                });
            }
        });
};

module.exports.deletePost = async (req, res) => {
    let id = req.params.id;

    let product = await Product.findByIdAndDelete(id);

    if (product.creator.equals(req.user._id) || req.user.roles.indexOf('Admin') >= 0) {
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
    }
};

module.exports.buyGet = (req, res) => {
    let id = req.params.id;

    Product.findById(id)
        .then((product) => {
            if (!product) {
                res.status(404);
                res.send('Product was not found!');
            }

            res.render('product/buy', {
                product: product
            });
        });
};

module.exports.buyPost = (req, res) => {
    let productId = req.params.id;

    Product.findById(productId)
        .then(product => {
            if (product.buyer) {
                let error = `error=${encodeURIComponent('Product was already bought')}`;
                res.redirect(`/?${error}`);
                return;
            }

            product.buyer = req.user._id;
            product.save()
                .then(() => {
                    req.user.boughtProducts.push(productId);
                    req.user.save()
                        .then(() => {
                            res.redirect('/');
                        });
                });
        });
};
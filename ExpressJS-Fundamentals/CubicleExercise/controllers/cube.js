const Cube = require('../models/Cube');

module.exports.addGet = (req, res) => {
    res.render('create');
};

module.exports.addPost = async (req, res) => {
    let cubeObj = req.body;
    try {
        await Cube.create(cubeObj)
            .then(() => {
                res.redirect('/');
            });

    } catch (e) {
        let errors = [];

        for (let props in e.errors) {
            errors.push(e.errors[props].message);
        }

        res.locals.error = errors;

        res.render('create');
    }
};

module.exports.detailsGet = (req, res) => {
    let cubeId = req.params.id;

    Cube.findOne({_id: cubeId})
        .then((foundCube) => {
            res.render('details', {
                cube: foundCube
            });
        });
};
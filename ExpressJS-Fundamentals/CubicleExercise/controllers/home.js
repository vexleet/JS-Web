const qs = require('querystring');
const Cube = require('../models/Cube');

module.exports.index = (req, res) => {
    let queryData = req.query;

    Cube.find()
        .then((cubes) => {
            let error = undefined;

            if (queryData.search && !queryData.from && !queryData.to) {
                cubes = cubes.filter(x => x.name.toLowerCase().includes(queryData.search.toLowerCase()));
            } else if (queryData.search && queryData.from && queryData.to) {
                if (queryData.from >= 1 && queryData.to <= 6) {
                    cubes = cubes.filter(x => {
                        return x.name.toLowerCase().includes(queryData.search.toLowerCase())
                            && x.difficulty >= queryData.from && x.difficulty <= queryData.to;
                    });
                } else {
                    error = ['Difficulty number must be between 1 and 6'];
                }
            }

            res.render('index', {
                cubes: cubes,
                error: error,
            });
        });
};
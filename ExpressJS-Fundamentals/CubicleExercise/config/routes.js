const handlers = require('../controllers');

module.exports = app => {
    app.get('/', handlers.home.index);

    app.get('/about', handlers.about.about);

    app.get('/create', handlers.cube.addGet);
    app.post('/create', handlers.cube.addPost);

    app.get('/details/:id', handlers.cube.detailsGet);
};
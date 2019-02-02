const homeController = require('../controllers/home');
const userController = require('../controllers/user');
const articleController = require('../controllers/article');

module.exports = (app) => {
    app.get('/', homeController.index);
    app.get('/user/register', userController.registerGet);
    app.post('/user/register', userController.registerPost);

    app.get('/user/login', userController.loginGet);
    app.post('/user/login', userController.loginPost);

    app.get('/user/logout', userController.logout);

    app.get('/user/details', userController.userDetailsGet);

    app.get('/article/create', articleController.createArticleGet);
    app.post('/article/create', articleController.createArticlePost);

    app.get('/article/details/:id', articleController.detailsGet);
    app.post('/article/details/:id', articleController.commentsPost);

    app.get('/article/edit/:id', articleController.editArticleGet);
    app.post('/article/edit/:id', articleController.editArticlePost);

    app.get('/article/delete/:id', articleController.deleteArticleGet);
    app.post('/article/delete/:id', articleController.deleteArticlePost);
    //TODO Add other app routes and restrict certain pages using auth.js
};


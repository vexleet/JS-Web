const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/users/register', controllers.user.registerGet);
    app.post('/users/register', controllers.user.registerPost);

    app.get('/users/logout', restrictedPages.isAuthed, controllers.user.logout);

    app.get('/users/login', controllers.user.loginGet);
    app.post('/users/login', controllers.user.loginPost);

    app.get('/article/create', restrictedPages.isAuthed, controllers.article.getCreateArticle);
    app.post('/article/create', restrictedPages.isAuthed, controllers.article.postCreateArticle);

    app.get('/articles', controllers.article.getAllArticles);

    app.get('/article/details/:id', controllers.article.getArticleDetails);

    app.get('/article/latest', controllers.article.latestArticle);

    app.get('/article/edit/:id', restrictedPages.isAuthed, controllers.article.getArticleEdit);
    app.post('/article/edit/:id', restrictedPages.isAuthed, controllers.article.postArticleEdit);

    app.get('/article/history/:id', controllers.article.getArticleHistory);

    app.get('/article/history/details/:id', controllers.article.getArticleHistoryDetails);

    app.get('/article/lock/:id', restrictedPages.hasRole('Admin'), controllers.article.lockArticle);
    app.get('/article/unlock/:id', restrictedPages.hasRole('Admin'), controllers.article.unlockArticle);

    app.post('/article/search', controllers.article.searchArticle);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
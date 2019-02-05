const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/users/register', controllers.user.registerGet);
    app.post('/users/register', controllers.user.registerPost);

    app.get('/users/logout', restrictedPages.isAuthed, controllers.user.logout);

    app.get('/users/login', controllers.user.loginGet);
    app.post('/users/login', controllers.user.loginPost);

    app.post('/threads/find', restrictedPages.isAuthed, controllers.thread.threadFind);

    app.get('/thread/:otherUser', restrictedPages.isAuthed, controllers.thread.openThread);
    app.post('/thread/:otherUser', restrictedPages.isAuthed, controllers.message.sendAMessage);

    app.post('/threads/remove/:threadId', restrictedPages.hasRole('Admin'),controllers.thread.deleteThread);

    app.post('/block/:username', restrictedPages.isAuthed, controllers.user.blockUser);

    app.post('/unblock/:username', restrictedPages.isAuthed, controllers.user.unblockUser);


    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
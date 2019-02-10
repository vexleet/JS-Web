const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);

    app.post('/logout', restrictedPages.isAuthed, controllers.user.logout);

    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);
    
    app.get('/user/profile', restrictedPages.isAuthed, controllers.user.getProfile);

    app.get('/team/create', restrictedPages.hasRole('Admin'), controllers.team.getCreateTeam);
    app.post('/team/create', restrictedPages.hasRole('Admin'), controllers.team.postCreateTeam);

    app.get('/project/create', restrictedPages.hasRole('Admin'), controllers.project.getCreateProjects);
    app.post('/project/create', restrictedPages.hasRole('Admin'), controllers.project.postCreateProject);

    app.get('/projects', restrictedPages.isAuthed, controllers.project.getProjects);
    app.post('/projects', restrictedPages.hasRole('Admin'), controllers.project.postProjects);

    app.get('/teams', restrictedPages.isAuthed, controllers.team.getTeams);
    app.post('/teams', restrictedPages.hasRole('Admin'), controllers.team.postTeams);

    app.post('/team/leave/:id', restrictedPages.isAuthed, controllers.team.leaveTeam);

    app.post('/search/team', controllers.team.searchTeam);
    app.post('/search/project', controllers.project.searchProject);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};
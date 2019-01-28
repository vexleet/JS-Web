const User = require('mongoose').model('User');
const encryption = require('../utilities/encryption');

function handleErrors(error) {
    let message = '';

    for (let field in error.errors) {
        message += error.errors[field].message + '\n';
    }

    return message;
}

module.exports.registerGet = (req, res) => {
    res.render('user/register');
};

module.exports.registerPost = (req, res) => {
    let user = req.body;

    if (user.password !== user.confirmedPassword) {
        let error = 'Password do not match!';

        res.render('user/register', {
            error: error,
        });
        return;
    }

    let salt = encryption.generateSalt();
    user.salt = salt;

    if (user.password) {
        let hashedPassword = encryption.generateHashedPassword(salt, user.password);
        user.password = hashedPassword;
    }

    User.create(user)
        .then(user => {
            req.logIn(user, (error, user) => {
                if (error) {
                    res.render('user/register', {
                        error: 'Authentication not working!'
                    });
                    return;
                }

                res.redirect('/');
            });
        }).catch(error => {

        res.render('user/register', {
            error: handleErrors(error)
        });
    });
};

module.exports.loginGet = (req, res) => {
    res.render('user/login');
};

module.exports.loginPost = (req, res) => {
    let userLogin = req.body;

    User.findOne({username: userLogin.username})
        .then((user) => {
            if (!user || !user.authenticate(userLogin.password)) {
                res.render('user/login', {
                    error: 'Invalid credentials!'
                });
            } else {
                req.logIn(user, (error, user) => {
                    if(error){
                        res.render('user/login', {
                            error: 'Authentication not working!'
                        });
                        return;
                    }

                    res.redirect('/');
                });
            }
        });
};

module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
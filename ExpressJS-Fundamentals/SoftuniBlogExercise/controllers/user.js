const User = require('mongoose').model('User');
const encryption = require('./../utilities/encryption');

module.exports = {
    registerGet: (req, res) => {
        res.render('user/register');
    },

    registerPost: (req, res) => {
        let registerArgs = req.body;

        User.findOne({
            email: registerArgs.email
        }).then(user => {
            let errorMsg = '';
            if (user) {
                errorMsg = 'User with the same username exists!';
            } else if (registerArgs.password !== registerArgs.repeatedPassword) {
                errorMsg = 'Passwords do not match!'
            } else if (!registerArgs.birthDate) {
                errorMsg = 'Please enter your birth date!';
            }

            if (errorMsg) {
                registerArgs.error = errorMsg;
                res.render('user/register', registerArgs)
            } else {
                let salt = encryption.generateSalt();
                let passwordHash = encryption.hashPassword(registerArgs.password, salt);

                let userObject = {
                    email: registerArgs.email,
                    passwordHash: passwordHash,
                    fullName: registerArgs.fullName,
                    gender: registerArgs.gender,
                    birthDate: registerArgs.birthDate,
                    salt: salt,
                    roles: ['User']
                };

                User.create(userObject).then(user => {
                    req.logIn(user, (err) => {
                        if (err) {
                            registerArgs.error = err.message;
                            res.render('user/register', registerArgs);
                            return;
                        }
                        res.redirect('/');
                    })
                });
            }
        })
    },

    loginGet: (req, res) => {
        res.render('user/login');
    },

    loginPost: (req, res) => {
        let loginArgs = req.body;
        User.findOne({
            email: loginArgs.email
        }).then(user => {
            if (!user || !user.authenticate(loginArgs.password)) {
                let errorMsg = 'Either username or password is invalid!';
                loginArgs.error = errorMsg;
                res.render('user/login', loginArgs);
                return;
            }

            req.login(user, (err) => {
                if (err) {
                    res.render('/user/login', {
                        error: err.message
                    });
                    return;
                }

                let returnUrl = '/';
                if (req.session.returnUrl) {
                    returnUrl = req.session.returnUrl;
                    delete req.session.returnUrl;
                }
                res.redirect(returnUrl);
            })
        })
    },

    logout: (req, res) => {
        req.logOut();
        res.redirect('/');
    },

    userDetailsGet: (req, res) => {
        res.render(`user/account`);
    },

    editUserGet: (req, res) => {
        res.render('user/edit', {
            user: req.user
        });
    },

    editUserPost: (req, res) => {
        let args = req.body;
        let userId = req.params.id;

        User.findById(userId)
            .then(user => {
                if (user.authenticate(args.password)) {
                    user.update({
                        fullName: args.fullName,
                        email: args.email,
                        birthDate: args.birthDate,
                        gender: args.gender,
                    })
                        .then(() => {
                            res.redirect(`/user/details`);
                        })
                        .catch(() => {
                            res.render(`user/edit`, {
                                error: 'This user already exists!'
                            });
                        });
                } else {
                    res.render(`user/edit`, {
                        error: 'Password does not match!'
                    });
                }
            });
    },

    editPasswordGet: (req, res) => {
        res.render('user/editPassword');
    },

    editPasswordPost: (req, res) => {
        let args = req.body;
        let userId = req.params.id;

        User.findById(userId)
            .then(user => {
                if (args.newPassword === args.repeatedPassword && user.authenticate(args.oldPassword)) {
                    let salt = encryption.generateSalt();
                    let passwordHash = encryption.hashPassword(args.newPassword, salt);

                    user.update({
                        passwordHash: passwordHash,
                        salt: salt,
                    }).then(() => {
                        res.redirect(`/user/details`);
                    })
                } else if (args.newPassword === args.repeatedPassword && !user.authenticate(args.oldPassword)) {
                    res.render(`user/editPassword`, {
                        error: 'Old password must match your current password!'
                    });
                } else {
                    res.render(`user/editPassword`, {
                        error: 'New passwords do not match!'
                    });
                }
            });
    },
};
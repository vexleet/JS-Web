const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    registerGet: (req, res) => {
        res.render('users/register');
    },
    registerPost: async (req, res) => {
        const reqUser = req.body;

        if(reqUser.password !== reqUser.confirmPassword){
            res.locals.globalError = 'Password do not match!';
            res.render('users/register');
            return;
        }

        const salt = encryption.generateSalt();
        const hashedPass =
            encryption.generateHashedPassword(salt, reqUser.password);
        try {
            const user = await User.create({
                username: reqUser.username,
                hashedPass,
                salt,
                firstName: reqUser.firstName,
                lastName: reqUser.lastName,
                roles: []
            });
            req.logIn(user, (err, user) => {
                if (err) {
                    res.locals.globalError = err;
                    res.render('users/register', user);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            res.locals.globalError = 'User with the same username exists!';
            res.render('users/register');
        }
    },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render('users/login');
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ username: reqUser.username });
            if (!user) {
                errorHandler('Invalid user data');
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                errorHandler('Invalid user data');
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);
            res.locals.globalError = e;
            res.render('users/login');
        }
    },

    blockUser: async (req, res) => {
        let otherUserUsername = req.params.username;
        let currentUser = await User.findById(req.user._id);

        currentUser.blockedUsers.push(otherUserUsername);
        currentUser.save()
            .then(() => {
                res.redirect(`/thread/${otherUserUsername}`);
            });
    },

    unblockUser: async (req, res) => {
        let otherUserUsername = req.params.username;
        let currentUser = await User.findById(req.user._id);

        let indexOfOtherUserUsername = currentUser.blockedUsers.indexOf(otherUserUsername);
        currentUser.blockedUsers.splice(indexOfOtherUserUsername, 1);
        
        currentUser.save()
            .then(() => {
                res.redirect(`/thread/${otherUserUsername}`);
            });
    },
};
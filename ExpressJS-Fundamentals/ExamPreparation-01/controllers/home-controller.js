const Threads = require('../models/Thread');

module.exports = {
    index: (req, res) => {
        let isAdmin = false;

        if (req.user) {
            if (req.user.roles.indexOf('Admin') >= 0) {
                isAdmin = true;
            }

            Threads.find()
                .then((threads) => {
                    res.render('home/index', {
                        threads,
                        isAdmin
                    });
                });
            return;
        }

        res.render('home/index');
    }
};
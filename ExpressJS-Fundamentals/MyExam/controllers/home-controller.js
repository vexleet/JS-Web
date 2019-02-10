module.exports = {
    index: (req, res) => {

        if(req.user){
            if(req.user.roles.indexOf('Admin') >= 0){
                res.locals.isAdmin = true;
            }
        }
        res.render('home/index');
    }
};
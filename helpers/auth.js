module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', "Not Authorized.! Please First Login");
        res.redirect('/users/login');
    }
}
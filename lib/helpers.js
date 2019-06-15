var isLoggedIn = function (res, res, next) {
    if (req.user.authenticated)
        return next();
    res.redirect('/');
}

module.exports = isLoggedIn

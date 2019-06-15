var isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log("ID: " + req.user.id);
      return next();
    }
    res.redirect("/login");
  };
  
  module.exports = isLoggedIn;
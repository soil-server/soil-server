var db = require("../models");
var passport = require("passport")

module.exports = function (app) {
  // Get all examples
  app.get("/api/plants", function (req, res) {
    db.public_dataset.findAll({}).then(function (dbPlants) {
      res.json(dbPlants);
    });
  });

  // Create a new example
  app.post("/api/plants", function (req, res) {
    db.Plant.create(req.body).then(function (dbPlant) {
      res.json(dbPlant);
    });
  });

  // Delete an example by id
  app.delete("/api/plants/:id", function (req, res) {
    db.Plant.destroy({ where: { id: req.params.id } }).then(function (dbPlant) {
      res.json(dbPlant);
    });
  });
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    });
};


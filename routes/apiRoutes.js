var db = require("../models");
var passport = require("passport")
var profile = require("../models/index")

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

  app.get('/api/t2', function (req, res) {


    var fullUrl = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ url: fullUrl });
  })


  app.get('/auth/google',
    passport.authenticate('google', { scope: ["profile"] }));


  app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/stats'
}));


  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

};
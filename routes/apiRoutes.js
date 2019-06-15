var db = require("../models");
var passport = require("passport")

module.exports = function (app) {
  // Get all examples
  app.get("/api/cares", function (req, res) {
    db.Care.findAll({}).then(function (dbCares) {
      res.json(dbCares);
    });
  });

  // Create a new example
  app.post("/api/cares", function (req, res) {

    console.log(req.body);

    db.Care.create({
      care: req.body.care,
      User: {
        user: req.body.user
      }
    }, {
        include: [db.User]
      }).then(function (dbUser) {
        res.json(dbUser);
      })
  });

  // Delete an example by id
  app.delete("/api/cares/:id", function (req, res) {
    db.Care.destroy({ where: { id: req.params.id } }).then(function (dbCare) {
      res.json(dbCare);
    });
  });

  app.get("/api/readings", function (req, res) {
    db.Reading.findAll({}).then(function (dbReadings) {
      res.json(dbReadings);
    });
  });

  // Create a new example
  app.post("/api/readings", function (req, res) {

    console.log(req.body);

    db.Reading.create({
      soil_moisture: "500",
      temperature: "80",
      humidity: "52.55",
      Plant: {
        plant_name: "Catnip"
      }
    }, {
        include: [db.Plant]
      }, {
        include: [db.User]
      }).then(function (dbPlant) {
        res.json(dbPlant);
      })
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


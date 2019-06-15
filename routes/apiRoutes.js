var db = require("../models");
var passport = require("passport")

module.exports = function (app) {

  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function (req, res) {

    console.log(req.body);

    db.User.create({
      google_id: req.body.google_id
    }).then(function (dbUser) {
      console.log("Success");
      res.json(dbUser);
    }).catch(function(err) {
      console.log(err, req.body.google_id);
      
    })
  });

  app.get("/api/cares", function (req, res) {
    db.Care.findAll({
      include: [db.User]
    }).then(function (dbCares) {
      res.json(dbCares);
    });
  });

  // Create a new example
  app.post("/api/cares", function (req, res) {

    console.log(req.body);

    db.Care.create({
      care: req.body.care,
      User: {
        google_id: req.body.google_id
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

  app.get("/api/plants", function (req, res) {
    db.Plant.findAll({
      include: [db.User]
    }).then(function (dbPlants) {
      res.json(dbPlants);
    });
  });

  // Create a new example
  app.post("/api/plants", function (req, res) {

    console.log(req.body);

    db.Plant.create({
      plant_name: req.body.plant_name,
      User: {
        google_id: req.body.google_id
      }
    }, {
        include: [db.User]
      }).then(function (dbPlant) {
        res.json(dbPlant);
      })
  });

  app.get("/api/readings", function (req, res) {
    db.Reading.findAll({
      include: [db.Plant]
    }).then(function (dbReadings) {
      res.json(dbReadings);
    });
  });

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


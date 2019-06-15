var db = require("../models");
var passport = require("passport")
var isLoggedIn = require("../lib/helpers.js")

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Plant.findAll({}).then(function(dbPlants) {
      res.render("index", {
        msg: "Welcome!",
        plants: dbPlants
      });
    });
  });

  // Load Plant page and pass in an Plant by id
  app.get("/plant/:id", function(req, res) {
    db.Plant.findOne({ where: { id: req.params.id } }).then(function(dbPlant) {
      res.render("Plant", {
        plant: dbPlant
      });
    });
  });

  app.get("/controls", function(req, res) {
<<<<<<< HEAD
    res.render('../views/controls')
=======
    res.render('controls')
>>>>>>> 88678fdf509596f3591d4b152b40ac634da96a28
  });

  app.get("/stats", function(req, res) {
    res.render('../views/stats')
  });

  app.get("/care", function(req, res) {
    res.render('../views/care')
  });
  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  



};


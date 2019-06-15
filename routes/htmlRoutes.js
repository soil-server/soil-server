var db = require("../models");
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

  app.get("/restricted", isLoggedIn, function(req, res) {
    res.render("restricted");
  })

  // Load Plant page and pass in an Plant by id
  app.get("/plant/:id", function(req, res) {
    db.Plant.findOne({ where: { id: req.params.id } }).then(function(dbPlant) {
      res.render("Plant", {
        plant: dbPlant
      });
    });
  });

  app.get("/controls", function(req, res) {
    res.render('controls')
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


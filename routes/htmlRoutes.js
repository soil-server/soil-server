var db = require("../models");
var passport = require("passport")

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

  app.get("/portfolio", function(req, res) {
    res.render(stats)
  })

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });



};


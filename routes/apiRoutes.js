var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/plants", function(req, res) {
    db.public_dataset.findAll({}).then(function(dbPlants) {
      res.json(dbPlants);
    });
  });

  // Create a new example
  app.post("/api/plants", function(req, res) {
    db.Plant.create(req.body).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });

  // Delete an example by id
  app.delete("/api/plants/:id", function(req, res) {
    db.Plant.destroy({ where: { id: req.params.id } }).then(function(dbPlant) {
      res.json(dbPlant);
    });
  });
};

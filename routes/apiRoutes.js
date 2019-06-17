var db = require("../models");
var passport = require("passport")

module.exports = function (app) {

  app.post("/api/usercares", function (req, res) {
    // console.log(req.body);
    db.Usercare.create(req.body).then(function (dbUser) {
        res.json(dbUser);
      }).catch(function(err) {
        // print the error details
        console.log(err);
    });
  });

  app.get("/api/usercares", function (req, res) {
    db.Usercare.findAll({}).then(function (dbUsercares) {
      res.json(dbUsercares);
    });
  });

  app.delete("/api/usercares/:id", function (req, res) {
    db.Usercare.destroy({ where: { id: req.params.id } }).then(function (dbCare) {
      res.json(dbCare);
    });
  });

  // app.get("/api/cares", function (req, res) {
  //   db.Care.findAll({
  //     include: [db.User]
  //   }).then(function (dbCares) {
  //     res.json(dbCares);
  //   });
  // });

  // app.post("/api/cares", function (req, res) {

  //   console.log(req.body);

  //   db.Care.create(req.body).then(function (dbUser) {
  //       res.json(dbUser);
  //     }).catch(function(err) {
  //       // print the error details
  //       console.log(err);
  //   });
  // });

  // app.delete("/api/cares/:id", function (req, res) {
  //   db.Care.destroy({ where: { id: req.params.id } }).then(function (dbCare) {
  //     res.json(dbCare);
  //   });
  // });

  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  // Create a new example
  app.post("/api/users", function (req, res) {
    db.User.create(req.body).then(function (dbUser) {
      res.json(dbUser);
    });
  });

  // // Delete an example by id
  // app.delete("/api/plants/:id", function (req, res) {
  //   db.Plant.destroy({ where: { id: req.params.id } }).then(function (dbPlant) {
  //     res.json(dbPlant);
  //   });
  // });

  app.get('/api/t2', function (req, res) {


    var fullUrl = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.json({ url: fullUrl });
  })


  app.get('/auth/google',
    passport.authenticate('google', { scope: ["profile"] }));


  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: '/care',
      failureRedirect: '/'
    }));


  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  // local auth
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
      res.redirect('/');
    });
  app.get("/logout")

};
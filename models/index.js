'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require("passport-local");

var models = require("../models")

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "282162927529-h0ics8823j4s7k538ajm226siiik9u5r.apps.googleusercontent.com",
  clientSecret: "GbdJ0azyAkPBMKvrmL-0XCMh",
  callbackURL: "http://localhost:3000/auth/google/callback",
  // passReqToCallback   : true
},
  function (accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log("Token: " + accessToken)
    console.log("Refresh Token: ")
    console.info(refreshToken)
    db.User.findOrCreate({
      where: {
        google_id: profile.id,
      },
      defaults: {
        user_photo: profile.photos[0].value,
        google_name: profile.displayName,
        given_name: profile.name.givenName
      }, function(err, user) {
        return done(err, user);
      }
    // }).then(([user, created]) => {
      // console.log(user.get({
      //   plain: true
      // }))
      // console.log(created)
    })
  }
));


passport.use(new LocalStrategy(
  function (username, password, done) {
    db.User.findOnez({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
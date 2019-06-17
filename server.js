require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Authentication
var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, accessInfo, profile, cb) => {
      console.log(profile)
      db.User.findOrCreate({
        where: { google_id: profile.id },
        defaults: {
          google_id: profile.id,
          user_photo: profile.photos[0].value,
          google_name: profile.displayName,
          first_name: profile.name.givenName
        }
      }).then(([user, created]) => {
        console.log(created);
        cb(false, user);
      });
    }
  )
);


// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  require("express-session")({
    secret: "control the things",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.get(
  "/login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = false;
}


// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});



module.exports = app;

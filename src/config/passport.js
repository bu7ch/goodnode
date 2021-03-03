const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
User = mongoose.model("user");

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      User.findOne({ email: email },
        function (err, user) {
          if (err) return done(err);
          if (user) {
            return done(null, false, {
              signupMessage: "that email is already taken",
            });
          } else {
            let newUser = new User(req.body);
            newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
            
            newUser.save(function (err) {
              if (err) 
                throw err;
              return done(null, newUser);
            });
          }
        });
    }
  )
);
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      User.findOne({ email:email},
        (err, user) => {
          if (err) return done(err);
          if (!user)
            return done(null, false, { loginMessage: "No user found." });
            
          if (!user.comparePassword(req.body.password))
            return done(null, false, { loginMessage: "Oops! Wrong password." });
          return done(null, user);
        });
    })
  )
};

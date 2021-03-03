// import express from "express";
// const userRouter = express.Router();
// import passport from "../config/passport";
// import { register, login } from "../controllers/userController";

const userRouter = function (app, passport) {
  app.get("/", (req, res) => {
    res.json("Coucou");
  });
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile",
      failureRedirect: "/login",
    })
    // login
  );
  app.post(
    "/register",
    passport.authenticate("local-signup", {
      successRedirect: "/profile",
      failureRedirect: "/register",
    })
  );
  // register
  app.get("/profile", (req, res) => {
    res.json({ user:[req.user, "You're are connected"]});
  });
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect('/')
// };

export { userRouter };

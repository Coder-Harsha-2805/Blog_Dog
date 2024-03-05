const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("landing");
});

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//handle signup logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/posts");
    });
  });
});


// show login form
router.get("/login", (req, res) => {
  res.render("login");
});

//handle login logic
// ----------> router.post('/login', middleware, callback)
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/posts",
    failureRedirect: "/login",
  }),
  (req, res) => {}
);

//logout route logic to destroy current sessions
router.get("/logout", (req, res,next) => {
 req.session.destroy(function (err){
  res.redirect("/");
 });
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;


//jab form se data enter karate hai tab humlog req.body.nameofparameter lete hai
//jab url ke data ka use karna hota hai tab humlog req.params.nameofparameter lete hai

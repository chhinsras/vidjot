const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");

const router = express.Router();

// Load User model
require("../models/User");
const User = mongoose.model("users");

// User Register route
router.get("/register", (req, res) => {
  res.render("users/register");
});

// User Login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// Logout user
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are now logged out");
  res.redirect("/users/login");
});

// Login From POST
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/ideas",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

// Register From POST
router.post("/register", (req, res) => {
  let errors = [];
  if (req.body.password != req.body.password2) {
    errors.push({ text: "Password do not match" });
  }
  console.log(req.body);
  if (req.body.password < 4) {
    errors.push({ text: "Password must be at least 4" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    });
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        req.flash("error_msg", "User exists");
        res.redirect("/users/register");
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash("success_msg", "You are now registed and can log in");
                res.redirect("/users/login");
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

module.exports = router;

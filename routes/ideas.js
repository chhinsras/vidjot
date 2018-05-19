const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated } = require("../helpers/auth");

// Load Models
require("../models/Idea");
const Idea = mongoose.model("ideas");

// Idea Index Page
router.get("/", ensureAuthenticated, (req, res) => {
  Idea.find({ userId: req.user.id })
    .sort({ date: "desc" })
    .then(ideas => {
      res.render("ideas/index", { ideas });
    });
});

// Add Idea Form
router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("ideas/add");
});

// Edit Idea Form
router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Idea.findOne({
    _id: req.params.id
  }).then(idea => {
    if (idea.userId != req.user.id) {
      req.flash("error_msg", "No authorized to edit");
      res.redirect("/ideas");
    } else {
      res.render("ideas/edit", { idea });
    }
  });
});

// Delete Idea
router.delete("/:id", ensureAuthenticated, (req, res) => {
  Idea.remove({ _id: req.params.id }).then(() => {
    req.flash("success_msg", "Video Idea removed");
    res.redirect("/ideas");
  });
});

// Process Form
router.post("/", (req, res) => {
  let errors = [];
  const title = req.body.title;
  const detail = req.body.detail;
  const userId = req.user.id;
  console.log(userId);
  if (!title) {
    errors.push({ text: "Please add a title" });
  }
  if (!detail) {
    errors.push({ text: "Please add some details" });
  }

  if (errors.length > 0) {
    res.render("/add", {
      errors,
      title,
      detail
    });
  } else {
    const newIdea = {
      title,
      detail,
      userId
    };
    new Idea(newIdea).save().then(idea => {
      req.flash("success_msg", "Video Idea Added");
      res.redirect("/ideas");
    });
  }
});

// Edit Form process
router.put("/:id", (req, res) => {
  Idea.findOne({ _id: req.params.id }).then(idea => {
    // new values
    idea.title = req.body.title;
    idea.detail = req.body.detail;
    idea.save().then(idea => {
      // console("idea.userId: " + idea.userId);
      // console("req.user.id: " + req.user.id);
      req.flash("success_msg", "Video Idea updated");
      res.redirect("/ideas");
    });
  });
});

module.exports = router;

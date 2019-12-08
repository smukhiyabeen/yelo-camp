/* eslint-disable no-console */

const express = require('express');
const Campground = require('../models/campground');
const Comment = require('../models/comment');

const router = express.Router({ mergeParams: true });

// Middleware to validate user is logged in
// eslint-disable-next-line consistent-return
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

// Comments New
router.get('/new', isLoggedIn, (req, res) => {
  // Find campgrounds by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      // render new comment form
      res.render('comments/new', { campground });
    }
  });
});

// Comments Create
router.post('/', isLoggedIn, (req, res) => {
  // Lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // eslint-disable-next-line no-shadow
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          // Add username and id to comment then save comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment);
          campground.save();
          // eslint-disable-next-line no-underscore-dangle
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

module.exports = router;

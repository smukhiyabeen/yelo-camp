/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Campground = require('../models/campground');
const Comment = require('../models/comment');

module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },
  checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) { // Validate the the user is logged in
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
          res.redirect('/back ');
        } else if (foundCampground.author.id.equals(req.user._id)) {
          next();
        }
      });
    } else {
      res.redirect('back');
    }
  },
  checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) { // Validate the the user is logged in
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          res.redirect('/back ');
        } else if (foundComment.author.id.equals(req.user._id)) {
          next();
        }
      });
    } else {
      res.redirect('back');
    }
  },
};

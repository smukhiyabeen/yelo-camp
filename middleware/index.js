/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const Campground = require('../models/campground');
const Comment = require('../models/comment');

module.exports = {
  isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect('/login');
  },
  checkCampgroundOwnership(req, res, next) {
    if (req.isAuthenticated()) { // Validate the the user is logged in
      Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
          req.flash('error', 'Campground not found');
          res.redirect('/back ');
        } else if (!foundCampground) {
          req.flash('error', 'Item not found.');
          return res.redirect('back');
        } else if (foundCampground.author.id.equals(req.user._id)) {
          next();
        }
      });
    } else {
      req.flash('error', 'You need to be logged in to do that');
      res.redirect('back');
    }
  },
  checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) { // Validate the the user is logged in
      Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
          req.flash('error', 'You dont have permission to do that');
          res.redirect('/back ');
        } else if (foundComment.author.id.equals(req.user._id)) {
          next();
        }
      });
    } else {
      req.flash('error', 'You need to be logged in to do that');
      res.redirect('back');
    }
  },
};

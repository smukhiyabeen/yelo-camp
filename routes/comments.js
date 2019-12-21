/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const express = require('express');
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const { checkCommentOwnership, isLoggedIn } = require('../middleware');

const router = express.Router({ mergeParams: true });

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

// Comments EDIT route
router.get('/:comment_id/edit', checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', { campground_id: req.params.id, comment: foundComment });
    }
  });
});

// Comments UPDATE route
router.put('/:comment_id/', checkCommentOwnership, (req, res) => {
  // eslint-disable-next-line no-unused-vars
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// Comments DESTROY route
router.delete('/:comment_id', checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;

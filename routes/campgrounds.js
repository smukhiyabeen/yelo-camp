const express = require('express');
const Campground = require('../models/campground');

const router = express.Router();

// Index
router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

// Create campground
router.post('/', (req, res) => {
  const newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  };


  // eslint-disable-next-line no-unused-vars
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// New campground form
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW ROUTE - shows info about one campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});

module.exports = router;

/* eslint-disable no-console */
/* eslint-disable no-dupe-keys */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
const seedDB = require('./seeds');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fkjkr.mongodb.net/yelp-camp?retryWrites=true&w=majority`;
const app = express();
const PORT = process.env.port || 3000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

seedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', { campgrounds: allCampgrounds });
    }
  });
});

app.post('/campgrounds', (req, res) => {
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
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

// SHOW ROUTE - shows info about one campground
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', { campground: foundCampground });
    }
  });
});


// COMMENTS ROUTES

app.get('/campgrounds/:id/comments/new', (req, res) => {
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

app.post('/campgrounds/:id/comments', (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          // eslint-disable-next-line no-underscore-dangle
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

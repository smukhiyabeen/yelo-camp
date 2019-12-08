/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const seedDB = require('./seeds');
const User = require('./models/user');

// Require routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// use .env for DB environment variables
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fkjkr.mongodb.net/yelp-camp?retryWrites=true&w=majority`;
const app = express();
const PORT = process.env.port || 3000;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// seedDB(); // Seed the database

// PASSPORT CONFIGURATION
app.use(require('express-session')({
  secret: 'hi im sub',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`App started on port ${PORT}`);
});

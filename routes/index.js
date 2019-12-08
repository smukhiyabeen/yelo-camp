const express = require('express');
const passport = require('passport');
const User = require('../models/user');

const router = express.Router();

// Root route
router.get('/', (req, res) => {
  res.render('landing');
});

// Show register form
router.get('/register', (req, res) => {
  res.render('register');
});

// Handle sign up logic
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = new User({ username });

  // eslint-disable-next-line consistent-return
  User.register(newUser, password, (err) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// Show login page
router.get('/login', (req, res) => {
  res.render('login');
});
// Handle login logic
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login',
}));

// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/campgrounds');
});

module.exports = router;

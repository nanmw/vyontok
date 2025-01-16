const catchAsync = require('../utils/catchAsync');

exports.getIndex = catchAsync(async (req, res, next) => {
  res.status(200).render('index', {
    activeLinks: ['home'],
    title: 'Leaders in quality construction',
  });
});

exports.getLogin = (req, res) => {
  res.status(200).render('login', {
    title: 'Login to your account',
  });
};

exports.getSignup = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up',
  });
};

exports.getLogout = catchAsync(async (req, res, next) => {
  res.redirect('/');
});
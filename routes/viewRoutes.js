const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get(['/', '/index'], authController.isLoggedIn, viewController.getIndex);
router.get(['/login'], authController.isLoggedIn, viewController.getLogin);
router.get('/signup', authController.isLoggedIn, viewController.getSignup);
// router.get('/search', authController.isLoggedIn, viewController.getSearch);
// router.get('/about', authController.isLoggedIn, viewController.getAbout);
// router.get('/causes', authController.isLoggedIn, viewController.getCauses);
// router.get('/causes/:slug', authController.isLoggedIn, viewController.getCause);
// router.get('/events', authController.isLoggedIn, viewController.getEvents);
// router.get('/events/:slug', authController.isLoggedIn, viewController.getEvent);
// router.get('/blogs', authController.isLoggedIn, viewController.getBlogs);
// router.get('/blogs/:slug', authController.isLoggedIn, viewController.getBlog);
// router.get('/volunteer', authController.isLoggedIn, viewController.getVolunteer);
// router.get('/profile/:id', authController.isLoggedIn, viewController.getProfile);
// router.get('/me', authController.protect, viewController.getAccount);
// router.get(
//   '/profile-edit/:id',
//   authController.protect,
//   authController.restrictFrom('user', 'volunteer'),
//   viewController.getProfileEdit
// );
// router.get('/me-edit', authController.protect, viewController.getAccountEdit);
// router.get('/donate/:causeSlug', authController.isLoggedIn, viewController.getDonation);
// router.get('/verification',
//   authController.isLoggedIn,
//   viewController.getVerification
// );
// router.get('/confirmation',
//   authController.isLoggedIn,
//   viewController.getConfirmationPage
// );
router.get('/logout', authController.isLoggedIn, viewController.getLogout);

module.exports = router;
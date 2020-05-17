const router = require('express').Router();
const passportGoogle = require('../config/passport-setup');
const passport = require('passport');

router.get('/api/google/login', passport.authenticate('google', {scope: ['profile', 'email']}))

router.get('/api/google/redirect', passportGoogle.googleLogin)

module.exports = router;

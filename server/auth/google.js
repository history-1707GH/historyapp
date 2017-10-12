const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const db = require('../db')
const User = db.models.user


module.exports = router

const googleConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
}

const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
  const googleId = profile.id
  const email = profile.emails[0].value
  const points = 0;

  User.find({where: {googleId}})
    .then(user => user
      ? done(null, user)
      : User.create({email, googleId, points})
        .then(user => done(null, user))
    )
    .catch(done)
})

passport.use(strategy)

router.get('/', passport.authenticate('google', {scope: 'email'}))

router.get('/callback', passport.authenticate('google', {
  successRedirect: '/account',
  failureRedirect: '/login'
}))
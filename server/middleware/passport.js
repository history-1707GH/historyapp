const router = require('express').Router();
const passport = require('passport');
const db  = require('../db')
const User = db.models.user;

if (process.env.NODE_ENV !== 'production') require('../../secrets_backend')


// passport registration DEFINING FUNCTIONS HERE
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(done);
});

router.use(passport.initialize());
router.use(passport.session());



module.exports = router;
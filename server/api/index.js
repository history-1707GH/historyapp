const router = require('express').Router();


router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/route', require('./route'));
router.use('/experience', require('./experience'));
router.use('/wiki', require('./wiki'));
router.use('/nyt', require('./nyt'));

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
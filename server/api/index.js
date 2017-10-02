const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/route', require('./route'));
router.use('/experience', require('./experience'));
router.use('/synopsis', require('./synopsis'));
router.use('/article', require('./article'));

// if user requests an API route that doesn't exist
router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
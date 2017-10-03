const router = require('express').Router();

// OB/FF: not yet living code?
//router.use('/google', require('./google'));
router.use('/me', require('./me'));

router.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});


module.exports = router;
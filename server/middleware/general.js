const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(morgan('dev'));


module.exports = router;
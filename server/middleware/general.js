const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.use(bodyParser.json({limit: "50mb"}));
router.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}))
router.use(morgan('dev'));


module.exports = router;
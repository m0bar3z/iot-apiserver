const express = require('express');
const router = express.Router();

const home = require('./home');
const device = require('./device');




router.use('/', home);

router.use('/device', device);


module.exports = router;

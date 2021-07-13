const express = require('express');
const router = express.Router();


//middlewares
const authMiddleware = require("./../middleware/auth")
const authError = require('./../middleware/authError');

const v1 = require('./v1');


const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,          //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
router.use(cors(corsOptions));

router.use(authMiddleware, authError);

router.use('/v1', v1);

module.exports = router;

const express    = require('express');
const router  = express.Router();


const {requireSignin, isAuth } = require('../controller/auth');
const {userById } = require('../controller/get_user_byId');
const {generateToken } = require('../controller/braintree');



router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken );



router.param("userId", userById);

module.exports = router;


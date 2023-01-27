const express = require('express')
const router  = new express.Router()

const {signup,
     signin,
     signout,
    } = require('../controller/auth')
const { signupValidator } = require('../validator')

router.post('/signup', signupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout)

 module.exports = router;
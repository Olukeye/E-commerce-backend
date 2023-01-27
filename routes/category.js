const express = require('express')
const router  = new express.Router()

const {
        create,
        categoryById,
        read,
        update,
        remove, 
        list
      } = require('../controller/category')
    
    const {userById} = require('../controller/get_user_byId')

    const { requireSignin, isAuth, isAdmin } = require('../controller/auth')

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/category/:categoryId', read)
router.put('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, update);
router.delete('/category/:categoryId/:userId', requireSignin, isAuth, isAdmin, remove);


router.get('/categories', list)
router.param('categoryId', categoryById)
router.param('userId', userById);

 module.exports = router
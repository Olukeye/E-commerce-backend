const express = require('express')
const router  = new express.Router()

const {
        create,
        productById,
        read,
        remove,
        update,
        list,
        listRelated,
        listCategories,
        listBySearch,
        photo,
        listSearch
      } = require('../controller/product');
      
      const {userById} = require('../controller/get_user_byId');

      const {
          isAuth,
          isAdmin, 
          requireSignin
      } = require('../controller/auth');
      

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read)
router.put('/product/:productId/:userId',requireSignin, isAuth, isAdmin, update)
router.delete('/product/:productId/:userId',requireSignin, isAuth, isAdmin, remove )

router.get('/products', list)
router.get('/products/search', listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);


router.param('userId', userById);
router.param('productId', productById);

 module.exports = router;
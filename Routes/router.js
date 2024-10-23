const express = require('express');
const productsController=require('../Controller/productsController');

const userController = require('../Controller/usersController');
const jwtMiddleware = require('../Middleware/jwtMiddleware');

const wishlistController = require('../Controller/wishlistController');
const cartController = require('../Controller/cartController');

const router = new express.Router();

//get all products
router.get('/all-products',productsController.getAllProductsController)

//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//get a product
router.get('/get-product/:id',productsController.getAproductController)

//add to wishlist
router.post('/add-wishlist',jwtMiddleware,wishlistController.addToWishlistController)

//get from wishlist
router.get('/wishlist/allproduct',jwtMiddleware,wishlistController.getfromWishlistController)

//remove from wishlist
router.delete('/wishlist/removeItem/:id',jwtMiddleware,wishlistController.removeWishlistItemController)

//add to cart
router.post('/add-cart',jwtMiddleware,cartController.addToCartController)

//get cart item
router.get('/cart/allproduct',jwtMiddleware,cartController.getItemFromCartController)

//remove item from cart
router.delete('/cart/remove-Item/:id',jwtMiddleware,cartController.removeItemController)

//increment cart
router.get('/cart/increment/:id',jwtMiddleware,cartController.incrementItem)

//decrement cart
router.get('/cart/decrement/:id',jwtMiddleware,cartController.decrementItem)


//empty cart
router.delete('/empty-cart',jwtMiddleware,cartController.emptyCartController)



module.exports = router;

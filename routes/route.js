const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const serviceController = require('../controllers/serviceController')
const orderController = require('../controllers/orderController')
const postController = require('../controllers/postController')
const validations = require('../validation/user.validation');

///////////////////// user Routes /////////////////////

router.get('/me', userController.allowIfLoggedIn, userController.getMe);

router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.post('/signup', validations.signInValidation, userController.signup);

router.post('/login', validations.logInValidation, userController.login);

router.put('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

////////////////// service Routes //////////////////

router.get('/getService/:serviceId', userController.allowIfLoggedIn, serviceController.getService);

router.get('/getServices', userController.allowIfLoggedIn, serviceController.getAllServices);

router.post('/createService', userController.allowIfLoggedIn, serviceController.createService);

router.put('/updateService/:serviceId', userController.allowIfLoggedIn, serviceController.updateService);

router.delete('/deleteService/:serviceId', userController.allowIfLoggedIn, serviceController.deleteService)

/////////////// order Routes //////////////////////

router.get('/getOrder/:orderId', userController.allowIfLoggedIn, orderController.getOrder)

router.get('/getOrders', userController.allowIfLoggedIn, orderController.getOrders)

router.post('/createOrder', userController.allowIfLoggedIn, orderController.createOrder)

router.put('/updateOrder/:orderId', userController.allowIfLoggedIn, orderController.updateOrder)

router.delete('/deleteOrder/:orderId', userController.allowIfLoggedIn, orderController.deleteOrder)

////////////// post Routes ////////////////////////

router.get('/getPost/:postId', userController.allowIfLoggedIn, postController.getPost)

router.get('/getPosts', userController.allowIfLoggedIn, postController.getPosts)

router.post('/createPost', userController.allowIfLoggedIn, postController.createPost)

router.put('/updatePost/:postId', userController.allowIfLoggedIn, postController.updatePost)

router.delete('/deletePost/:postId', userController.allowIfLoggedIn, postController.deletePost)

router.post('/like/:postId', userController.allowIfLoggedIn, postController.likePost)

router.delete('/like/:postId', userController.allowIfLoggedIn, postController.unLikePost)


module.exports = router;

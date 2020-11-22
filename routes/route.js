const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const serviceController = require('../controllers/serviceController')
const orderController = require('../controllers/orderController')
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

router.delete('/deleteService', userController.allowIfLoggedIn, serviceController.deleteService)

/////////////// order Routes //////////////////////

router.get('/getOrder/:orderId', userController.allowIfLoggedIn, orderController.getOrder)

router.get('/getOrders', userController.allowIfLoggedIn, orderController.getOrders)

router.post('/createOrder', userController.allowIfLoggedIn, orderController.createOrder)

router.put('/updateOrder', userController.allowIfLoggedIn, orderController.updateOrder)

router.delete('/deleteOrder', userController.allowIfLoggedIn, orderController.deleteOrder)


module.exports = router;

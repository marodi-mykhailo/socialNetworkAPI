const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validations = require('../validation/user.validation');


router.post('/signup', validations.signInValidation, userController.signup);

router.post('/login', validations.logInValidation, userController.login);

router.get('/me', userController.getMe);

router.get('/user/:userId', userController.allowIfLoggedIn, userController.getUser);

router.get('/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/user/:userId', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);


module.exports = router;

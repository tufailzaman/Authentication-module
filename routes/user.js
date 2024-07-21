const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.post('/signup',userController.postUser);

router.post('/verifyEmail',userController.verifyUser);

router.post('/reset', userController.reset);

router.post('/verfycode',userController.verifyCode);

router.post('/newPassword/:id', userController.newPassword);

module.exports = router;
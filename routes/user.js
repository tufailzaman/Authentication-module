const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.post('/signup',userController.postUser);
router.post('/verifyEmail',userController.verifyUser);


module.exports = router;
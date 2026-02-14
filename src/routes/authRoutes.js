const router = require('express').Router();
const controller = require('../contoller/authController');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/forgot-password', controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);

module.exports = router;

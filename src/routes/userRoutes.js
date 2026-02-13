const router = require('express').Router();
const controller = require('../contoller/userController');

router.get('/me', controller.getProfile);
router.put('/update', controller.updateProfile);
router.post('/address', controller.addAddress);
router.get('/address', controller.getAddress);

module.exports = router;

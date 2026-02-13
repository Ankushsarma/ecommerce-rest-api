const router = require('express').Router();
const controller = require('../contoller/payemntController');

router.post('/create', controller.createPayment);
router.post('/verify', controller.verifyPayment);

module.exports = router;

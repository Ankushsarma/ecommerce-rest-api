const router = require('express').Router();
const controller = require('../contoller/orderController');

router.post('/', controller.placeOrder);
router.get('/my', controller.getMyOrders);
router.get('/:id', controller.getOrderById);
router.put('/cancel/:id', controller.cancelOrder);

module.exports = router;

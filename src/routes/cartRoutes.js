const router = require('express').Router();
const controller = require('../contoller/cartController');

router.get('/', controller.getCart);
router.post('/add', controller.addToCart);
router.put('/update', controller.updateCart);
router.delete('/remove/:id', controller.removeFromCart);

module.exports = router;

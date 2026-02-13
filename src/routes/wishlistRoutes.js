const router = require('express').Router();
const controller = require('../contoller/wishlistController');

router.get('/', controller.getWishlist);
router.post('/add', controller.addToWishlist);
router.delete('/remove/:id', controller.removeFromWishlist);

module.exports = router;

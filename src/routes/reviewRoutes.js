const router = require('express').Router();
const controller = require('../contoller/reviewController');

router.post('/', controller.addReview);
router.get('/:productId', controller.getReviews);

module.exports = router;

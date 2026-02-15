const router = require("express").Router();
const auth = require("../contoller/authController");

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/forgot-password", auth.forgotPassword);
router.post("/reset-password/:token", auth.resetPassword);
module.exports = router;

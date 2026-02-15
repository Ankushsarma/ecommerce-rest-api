const router = require("express").Router();
const userController = require("../contoller/userController");
const auth = require("../utils/generateToken");

router.get("/me", auth, userController.getMe);
router.put("/update-profile", auth, userController.updateProfile);
router.put("/change-password", auth, userController.changePassword);

router.post("/add-address", auth, userController.addAddress);
router.get("/get-address", auth, userController.getAddress);

// Admin
router.get("/users", auth, userController.getUsers);
router.get("/users/:id", auth, userController.getUserById);
router.put("/users/:id/role", auth, userController.updateUserRole);
router.delete("/users/:id", auth, userController.deleteUser);

module.exports = router;

const router = require("express").Router();
const userController = require("../contoller/userController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware")

router.get("/me", auth, userController.getMe);
router.put("/update", auth, userController.updateProfile);
router.put("/change-password", auth, userController.changePassword);
router.post("/address", auth, userController.addAddress);
router.get("/address", auth, userController.getAddress);

router.get("/", auth, role("admin"), userController.getUsers);
router.get("/:id", auth, role("admin"), userController.getUserById);
router.put("/role/:id", auth, role("admin"), userController.updateUserRole);
router.delete("/:id", auth, role("admin"), userController.deleteUser);



module.exports = router;

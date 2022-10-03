const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const UserController = require("../controller/userController")
router.post("/register",UserController.Register );
router.post("/login",UserController.Login );
router.get("/me", auth, UserController.Me);

module.exports = router;

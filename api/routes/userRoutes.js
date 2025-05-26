const express = require("express");
const { userValidator } = require("../middleware/userValidator");

const router = express.Router();

const userController = require("../controllers/userController");

router.post("/register", userValidator, userController.register); // signup or credentials created by another user
router.post("/login", userValidator, userController.login);

module.exports = router;
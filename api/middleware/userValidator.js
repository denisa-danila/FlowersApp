const { body } = require("express-validator");

// Validation for register/login
exports.userValidator = [
  body("email")
    .isEmail()
    .withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];
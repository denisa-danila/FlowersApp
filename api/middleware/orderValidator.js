const { body, param } = require("express-validator");

// Validation for creating a new order
exports.createOrderValidator = [
  body("status")
    .optional()
    .isIn(["pending", "delivered", "canceled"])
    .withMessage("Invalid status value"),

  body("details")
    .notEmpty()
    .withMessage("details are required"),

  body("quantity")
    .notEmpty()
    .withMessage("quantity is required")
    .isInt({ min: 1 })
    .withMessage("quantity must be an integer greater than 0"),

  body("address")
    .notEmpty()
    .withMessage("address is required")
];

// Validation for updating an order (ID param + optional body fields)
exports.updateOrderValidator = [
  param("orderId")
    .isMongoId()
    .withMessage("Invalid order ID"),

  body("status")
    .optional()
    .isIn(["pending", "delivered", "canceled"])
    .withMessage("Invalid status value"),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("quantity must be an integer greater than 0"),
];

// Validation for findOrderById
exports.findByIdValidator = [
  param("orderId")
    .isMongoId()
    .withMessage("Invalid order ID"),
];
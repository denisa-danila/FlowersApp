const express = require("express");
const { createOrderValidator, updateOrderValidator, findByIdValidator } = require("../middleware/orderValidator");

const router = express.Router();

const orderController = require("../controllers/orderController");

router.post("/", createOrderValidator, orderController.createOrder);
router.get("/", orderController.findAllOrders); // admin gets all orders; regular user gets only their own orders
router.get("/:id",findByIdValidator, orderController.findOrderById);
router.patch("/:id", updateOrderValidator, orderController.updateOrder);

module.exports = router;
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "canceled"],
        default: "pending"
    },
    details: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Order", orderSchema);
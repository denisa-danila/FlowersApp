const orderService = require("../services/orderService");

exports.createOrder = async (req, res) => {
    try {
        const orderId = await orderService.createOrder(req.body, req.user.id);
        res.status(201).json({_id: orderId});
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

exports.findOrderById = async (req, res) => {
    try {
        const orders = await orderService.findOrderById(req.params.id, req.user);
        res.status(200).json(orders);
    } catch (err) {
        if (err.message === "Unauthorized") {
            return res.status(401).json({message: err.message});
        }
        res.status(500).json(err);
    }
}

exports.findAllOrders = async (req, res) => {
    try {
        console.log(req.query);
        const orders = await orderService.findAllOrders(req.user, req.query?.status);
        res.status(200).json(orders);
    } catch (err) {
        res.status(401).json({message: err.message});
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const updated = await orderService.updateOrder(req.user, req.params.id, req.body);
        res.status(200).json(updated);
    } catch (err) {
        if (err.message === "Unauthorized") {
            res.status(403).json({message: err.message});
        } else if (err.message === "Order not found") {
            res.status(404).json({message: err.message});
        } else {
            res.status(500).json({message: err.message});
        }
    }
}
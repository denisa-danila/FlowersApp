const Order = require("../models/order");

exports.createOrder = async (data) => {
    const order = new Order(data)
    return await order.save();
}

exports.findAllOrders = async (status) => {
    const filter = {};
    if (status) filter.status = status;
    return await Order.find(filter);
}

exports.findById = async(id) => {
    return await Order.findById(id);
}

exports.findByCreatedBy = async(createdBy, status) => {
    const filter = {createdBy: createdBy};
    if (status) filter.status = status;
    return await Order.find(filter);
}

exports.updateOrder = async(id, updateData) => {
    return await Order.findByIdAndUpdate(id, updateData);
}
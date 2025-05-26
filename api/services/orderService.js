const orderRepo = require("../repositories/orderRepo");

exports.createOrder = async(data, userId) => {
    data.createdBy = userId;
    return await orderRepo.createOrder(data);
}

exports.findAllOrders = async(userData, status) => {
    if (userData.role === "admin") {
        return await orderRepo.findAllOrders(status);
    } else {
        return await orderRepo.findByCreatedBy(userData.id, status);
    }
}

exports.findOrderById = async(orderId, userData) => {
    let order = await orderRepo.findById(orderId);
    if (!order) throw new Error("Could not get order");
    if (userData.id !== order.createdBy && userData.role !== "admin") {
        throw new Error("Unauthorized");
    }
    return order;
    
}

exports.updateOrder = async(userData, orderId, updateData) => {
    const order = await orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    // only the user who created the order or the admin can update
    if (order.createdBy !== userData.id && userData.role !== "admin") throw new Error("Unauthorized");
    return await orderRepo.updateOrder(orderId, updateData);
}
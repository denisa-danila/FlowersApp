const orderService = require("../../api/services/orderService");
const orderRepo = require("../../api/repositories/orderRepo");

jest.mock("../../api/repositories/orderRepo");

describe("Order Service", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createOrder", () => {
    it("should add createdBy and call orderRepo.createOrder", async () => {
      const data = { details: "Roses", quantity: 2, address: "123 Street" };
      const userId = "user123";

      orderRepo.createOrder.mockResolvedValue({ ...data, createdBy: userId });

      const result = await orderService.createOrder(data, userId);

      expect(orderRepo.createOrder).toHaveBeenCalledWith({ ...data, createdBy: userId });
      expect(result.createdBy).toBe(userId);
    });
  });

  describe("findAllOrders", () => {
    it("should return all orders if user is admin", async () => {
      const adminUser = { id: "admin123", role: "admin" };
      const mockOrders = [{ id: "1" }, { id: "2" }];

      orderRepo.findAllOrders.mockResolvedValue(mockOrders);

      const result = await orderService.findAllOrders(adminUser);

      expect(orderRepo.findAllOrders).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });

    it("should return only user's orders if user is regular", async () => {
      const regularUser = { id: "user123", role: "regular" };
      const userOrders = [{ id: "3", createdBy: "user123" }];

      orderRepo.findByCreatedBy.mockResolvedValue(userOrders);

      const result = await orderService.findAllOrders(regularUser, null);

      expect(orderRepo.findByCreatedBy).toHaveBeenCalledWith("user123", null);
      expect(result).toEqual(userOrders);
    });

    it("should return only pending orders", async () => {
      const adminUser = { id: "admin123", role: "admin" };
      const mockOrders = [{ id: "1", status: "pending" }, { id: "2", status: "pending" }];

      orderRepo.findAllOrders.mockResolvedValue(mockOrders);

      const result = await orderService.findAllOrders(adminUser, "pending");

      expect(orderRepo.findAllOrders).toHaveBeenCalledWith("pending");
      expect(result).toEqual(mockOrders);
    });
  });

  describe("findOrderById", () => {
    it("should return the order by ID if the user is creator", async () => {
      const user = { id: "user123", role: "regular" };
      const mockOrder = { id: "order123", createdBy: "user123" };
      orderRepo.findById.mockResolvedValue(mockOrder);

      const result = await orderService.findOrderById("order123", user);

      expect(orderRepo.findById).toHaveBeenCalledWith("order123");
      expect(result).toEqual(mockOrder);
    });

    it("should return the order by ID if the user has admin role", async () => {
      const user = { id: "user123", role: "admin" };
      const mockOrder = { id: "order123", createdBy: "otherUser" };
      orderRepo.findById.mockResolvedValue(mockOrder);

      const result = await orderService.findOrderById("order123", user);

      expect(result).toEqual(mockOrder);
    });

    it("should error if user is unauthorized", async () => {
      const user = { id: "user123", role: "regular" };
      const mockOrder = { id: "order123", createdBy: "otherUser" };
      orderRepo.findById.mockResolvedValue(mockOrder);

      await expect(orderService.findOrderById("user123", user)).rejects.toThrow("Unauthorized");
    });

    it("should error if order id does not exist", async () => {
      const user = { id: "user123", role: "admin" };
      orderRepo.findById.mockResolvedValue(null);

      await expect(orderService.findOrderById("user123", user)).rejects.toThrow("Could not get order");
    });

  });

  describe("updateOrder", () => {
    it("should update order if user is the creator", async () => {
      const user = { id: "user123", role: "regular" };
      const orderId = "order123";
      const updateData = { status: "delivered" };
      const existingOrder = { id: orderId, createdBy: user.id };

      orderRepo.findById.mockResolvedValue(existingOrder);
      orderRepo.updateOrder.mockResolvedValue({ ...existingOrder, ...updateData });

      const result = await orderService.updateOrder(user, orderId, updateData);

      expect(orderRepo.findById).toHaveBeenCalledWith(orderId);
      expect(orderRepo.updateOrder).toHaveBeenCalledWith(orderId, updateData);
      expect(result.status).toBe("delivered");
    });

    it("should update order if user has admin role", async () => {
      const user = { id: "user123", role: "admin" };
      const orderId = "order123";
      const updateData = { status: "delivered" };
      const existingOrder = { id: orderId, createdBy: "otherUser" };

      orderRepo.findById.mockResolvedValue(existingOrder);
      orderRepo.updateOrder.mockResolvedValue({ ...existingOrder, ...updateData });

      const result = await orderService.updateOrder(user, orderId, updateData);

      expect(orderRepo.findById).toHaveBeenCalledWith(orderId);
      expect(orderRepo.updateOrder).toHaveBeenCalledWith(orderId, updateData);
      expect(result.status).toBe("delivered");
    });

    it("should error if order is not found", async () => {
      orderRepo.findById.mockResolvedValue(null);

      await expect(orderService.updateOrder("user123", "order123", {})).rejects.toThrow("Order not found");
    });

    it("should error if user is not authorized", async () => {
      const userId = "user123";
      const orderId = "order123";
      const existingOrder = { id: orderId, createdBy: "otherUser" };

      orderRepo.findById.mockResolvedValue(existingOrder);

      await expect(orderService.updateOrder(userId, orderId, {})).rejects.toThrow("Unauthorized");
    });
  });
});
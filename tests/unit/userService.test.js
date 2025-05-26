const userService = require("../../api/services/userService");
const userRepo = require("../../api/repositories/userRepo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../../api/repositories/userRepo");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("User Service", () => {

  describe("register", () => {
    it("should create new user and return user id", async () => {
      // Arrange
      const fakeUser = { _id: "user123", email: "test@test.com" };
      userRepo.createUser.mockResolvedValue(fakeUser);

      // Act
      const result = await userService.register({ email: "test@test.com", password: "pass123" });

      // Assert
      expect(userRepo.createUser).toHaveBeenCalledWith({
        email: "test@test.com",
        password: "pass123"
      });
      expect(result).toBe("user123");
    });
    
  });

  describe("login", () => {
    const email = "test@test.com";
    const password = "pass123";
    const hashedPassword = "hashedPass123";
    const fakeUser = { _id: "user123", email: email, password: hashedPassword, role: "regular" };

    it("should error if user not found", async () => {
      userRepo.findByEmail.mockResolvedValue(null);

      await expect(userService.login({ email, password })).rejects.toThrow("Cannot find user");
    });

    it("should error if password is invalid", async () => {
      userRepo.findByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(userService.login({ email, password })).rejects.toThrow("Not allowed");
    });

    it("should return a token if credentials are valid", async () => {
      process.env.JWT_SECRET = "test_secret";
      userRepo.findByEmail.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("mocked-jwt-token");

      const token = await userService.login({ email, password });

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(jwt.sign).toHaveBeenCalledWith({ id: "user123", role: "regular" }, expect.any(String));
      expect(token).toBe("mocked-jwt-token");
    });
  });

});
const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../app");
const Order = require("../../api/models/order");
const User = require("../../api/models/user");

let mongoServer;
let authToken;

const userCredentials = {
  email: "test@example.com",
  password: "password123"
};

beforeAll(async () => {
  // in-memory MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  process.env.NODE_ENV = "test";
  await mongoose.connect(uri);

  // register and login user to get token
//   await request(app).post("/api/users/register").send(userCredentials);
//   const res = await request(app).post("/api/users/login").send(userCredentials);
//   authToken = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Orders API", () => {

  it("should create a new order", async () => {
    // register and login user to get token
    const res0 = await request(app).post("/api/users/register").send(userCredentials);
    expect(res0.statusCode).toBe(201);
    const res1 = await request(app).post("/api/users/login").send(userCredentials);
    expect(res1.statusCode).toBe(200);
    authToken = res1.body.token;

    const res = await request(app)
      .post("/orders")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        details: "Roses",
        quantity: 2,
        address: "my house"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

//   it("should get orders for the authenticated user", async () => {
//     const res = await request(app)
//       .get("/orders")
//       .set("Authorization", `Bearer ${authToken}`);

//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//   });
});
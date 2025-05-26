require("dotenv").config();
const express = require("express");
const connectDB = require("./api/config/dbConfig");
const userRouter = require("./api/routes/userRoutes");
const orderRouter = require("./api/routes/orderRoutes");
const authorize = require("./api/middleware/authorization");

const app = express();
connectDB();

const setupSwaggerDocs = require("./swagger/swaggerUI");
setupSwaggerDocs(app);

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/orders", authorize, orderRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
require("dotenv").config();
const express = require("express");
const connectDB = require("./api/config/dbConfig");
const userRouter = require("./api/routes/userRoutes");
const app = express();
connectDB();


app.use(express.json());
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
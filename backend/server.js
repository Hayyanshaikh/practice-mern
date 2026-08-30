require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

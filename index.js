import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import cors from "cors";
//////////////////////////////////////////////////////////////////
// import videoRoutes from "./routes/videos.js";
// import commentRoutes from "./routes/comments.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";

const app = express();

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(cors());
//////////////////////////////////////////////////////////////////

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

dotenv.config();
const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res) => console.log(chalk.bgBlue("DB Connect")))
      .catch((err) => console.log(chalk.bgRed(err)));

    app.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log(chalk.bgRed(err));
      }
      console.log(chalk.bgBlue(`Starting Server on port ${process.env.PORT}`));
    });
  } catch (error) {
    console.log(chalk.bgRed(error));
  }
};
start();

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

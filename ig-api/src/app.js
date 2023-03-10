import express from "express";
import morgan from "morgan";
import cors from "cors";
import { mongooseConnection } from "./mongo.js";
import AuthRouter from "./routes/v1/authRoutes.js";
import UserRouter from "./routes/v1/userRoutes.js";
import PublicationRouter from "./routes/v1/publicationRouter.js";
import config from "./config.js";

const app = express();
mongooseConnection();

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: config.CORS_ORIGIN,
  })
);

//Routes
app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/publication", PublicationRouter);
app.use("/api/v1/images", express.static("src/images"));
app.use((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(404).json({ message: "Route not found" });
});

export default app;

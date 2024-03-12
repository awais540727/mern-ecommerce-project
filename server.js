import express from "express";
import env from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configure env
env.config();

// database connection
connectDB();

// rest object
const app = express();

app.use(cors());

// middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./ecom/build")));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./ecom/build/index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT}`.bgCyan.white);
});

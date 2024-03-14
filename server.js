import express from "express";
import env from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure environment variables
env.config();

// Connect to the database
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Serve static files from the 'build' directory
const staticFilesDir = path.join(__dirname, "ecom", "build");
app.use(express.static(staticFilesDir));

// API routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve 'index.html' for all other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(staticFilesDir, "index.html"), (err) => {
    if (err) {
      console.error("Error sending 'index.html':", err);
      res.status(500).send("Internal Server Error");
    }
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

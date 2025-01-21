import express from "express";
const dotenv = require('dotenv');
import serverRoutes from "./routes/serverRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", serverRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;

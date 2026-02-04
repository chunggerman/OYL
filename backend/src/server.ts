import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import IndexRouter from "./api/routes/IndexRouter";
import ErrorRouter from "./api/routes/ErrorRouter";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

// Mount ALL API routes under the unified index router
app.use("/", IndexRouter);

// Global error handler (must be last)
app.use(ErrorRouter);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});

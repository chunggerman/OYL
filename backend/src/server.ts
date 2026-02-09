//backend/src/server.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// 🔥 Add this import
import listEndpoints from "express-list-endpoints";

import IndexRouter from "./api/routes/IndexRouter";

const app = express();

app.use(cors());
app.use(express.json());

// --------------------------------------------------
// DEBUG ROUTES ENDPOINT (for troubleshooting routing)
// --------------------------------------------------
app.get("/debug-routes", (req, res) => {
  try {
    const routes = listEndpoints(app);
    res.status(200).json(routes);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// --------------------------------------------------
// MAIN ROUTER
// --------------------------------------------------
app.use("/", IndexRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

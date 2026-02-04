
import express from "express";
import api from "../backend/src/api/index.ts.old";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", api);

const port = 4000;
app.listen(port, () => {
  console.log("API server running on port", port);
});

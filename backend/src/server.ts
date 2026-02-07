import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import IndexRouter from "./api/routes/IndexRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/debug-routes", (req, res) => {
  res.json({ ok: true });
});

app.use("/", IndexRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

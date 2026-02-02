import express from "express";
import router from "./api/routes";

const app = express();
app.use(express.json());
app.use("/", router);

export { app };

if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log("Server running on port", port);
  });
}

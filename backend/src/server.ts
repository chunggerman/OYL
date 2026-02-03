import express from "express";
import routes from "./api/routes";

const app = express();
app.use(express.json());

app.use(routes);

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

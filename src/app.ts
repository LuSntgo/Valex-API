import cors from "cors";
import express from "express";
import "express-async-errors";
import router from "./routers/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});

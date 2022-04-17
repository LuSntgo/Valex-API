import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

const app = express();
app.use(cors());
app.use(express.json());


export default app;

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

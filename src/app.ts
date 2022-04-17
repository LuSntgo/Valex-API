import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cardRouter from "./routers/cardRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cardRouter)


export default app;

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

import path from "path";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { errors } from "celebrate";
import "dotenv/config";

import productsRouter from "./routes/product";
import orderRouter from "./routes/order";
import errorHandler from "./middlewares/errorHandler";
import { requestLogger, errorLogger } from "./middlewares/logger";

const { PORT, DB_ADDRESS } = process.env;

const app = express();

app.use(cors());

mongoose.connect(DB_ADDRESS!);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(requestLogger);

app.use("/product", productsRouter);
app.use("/order", orderRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App port: ${PORT}`);
});

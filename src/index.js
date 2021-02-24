import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import "./config/db";
const app = express();
dotenv.config();

const port = process.env.PORT;

import userRouter from "./routes/userRoute";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(helmet.frameguard());
// app.use(helmet({
//   frameguard:false
// }))

app.use("/auth", userRouter);

app.listen(port, () => console.log(`Application is running on port : ${port}`));

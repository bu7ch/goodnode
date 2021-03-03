import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import "./config/db";
const app = express();
dotenv.config();
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import volleyball from "volleyball";

const port = process.env.PORT;

import { userRouter } from "./routes/userRoute";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(volleyball);
app.use(cookieParser());
app.use(
  session({
    secret: "hiroTanaka",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(helmet());
app.use(helmet.frameguard());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

// app.use(helmet({
//   frameguard:false
// }))

userRouter(app, passport);

app.listen(port, () => console.log(`Application is running on port : ${port}`));

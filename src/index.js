import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
const app = express();
dotenv.config();

const port = process.env.PORT;
app.use(express.urlencoded({ extended:true}))
app.use(express.json())
app.use(helmet())
app.use(helmet.frameguard())
// app.use(helmet({
//   frameguard:false
// }))


app.listen(port, () => console.log(`Application is running on port : ${port}`));

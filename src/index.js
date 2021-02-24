import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config()

const port = process.env.PORT

app.listen(port, () => console.log(`Application is running on port : ${port}`))
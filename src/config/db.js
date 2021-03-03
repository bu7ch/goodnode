import mongoose from "mongoose";
mongoose
  .connect("mongodb://localhost/database_prout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection established!!"))
  .catch(() => console.log("Error connection failed !!"));

  require('../models/userModel')
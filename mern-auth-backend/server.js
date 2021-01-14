const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({path:'/home/don/lighthouse/fung-tech-challenge/.env'});
// console.log({__dirname})
const mongoDbConnection = process.env.MONGODB_CONNECTION_STRING;
// console.log(mongoDbConnection);

//express setup
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`the server is listening on ${PORT}`));

// mongoose setup
mongoose.connect(
  mongoDbConnection,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    else console.log("MongoDB connection is established");
  }
);

// routes setup
app.use("/users", require("./routes/userRouter"));

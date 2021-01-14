const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config;

//express setup
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`the server is listening on ${PORT}`))

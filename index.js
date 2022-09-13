const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

//MiddleWare
app.use(cors()); //avoiding cors policy error
app.use(express.json()); // avoiding body parse json error

app.get("/", (req, res) => {
  res.send("Welcome to Task Manager Server");
});

app.listen(port, () => {
  console.log("Listening to", port);
});
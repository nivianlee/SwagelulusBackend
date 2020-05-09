var express = require("express");
var app = express();

require("dotenv").config();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

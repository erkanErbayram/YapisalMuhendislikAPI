const express = require("express");

const app = express();
const dbConnect = require("./config/db");
const path = require("path");
var http = require('http');
var server = http.createServer(function (req, res) {
  res.write('Hi!');
  res.end();
});
require('dotenv').config();

server.timeout = 0; //Set to 0 to disable any kind of automatic timeout behavior on incoming connections.

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));
//<---BODYPARSER-->
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//<---Mongo DB CONNECT--->
dbConnect();
//<---Mongo DB CONNECT--->

app.get("/", (req, res) => {
  res.send("Yapisal Muhendislik API");
});

//<---ROUTES--->

app.use("/api/user", require("./routes/userRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/subCategory", require("./routes/subCategoryRoute"));
app.use("/api/project", require("./routes/projeler"));
app.use("/api/reference", require("./routes/referanslar"));
app.use("/api/slide", require("./routes/slaytlar"));

//<---ROUTES--->


app.listen(process.env.PORT, () => {
  console.log(`Server Running on Port ${process.env.PORT}`);
});
server.timeout = 0; 

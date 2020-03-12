#!/usr/bin/env node

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");
var https = require("https");
var http = require("http");
var app = express();

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
      // named pipe
      return val;
  }

  if (port >= 0) {
      // port number
      return port;
  }

  return false;
}

var port = normalizePort(process.env.PORT || '3000');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use("/user", require("./routes/user"));

// error handler
app.use(function(err, req, res, next) {
  console.error(err);
  res.send(500, "Something went wrong");
});

app.get("/", function(req, res) {
  res.send(200, "Server running");
});


const server = http.createServer(app);
server.listen(port);
console.log("Server running");

process.on('uncaughtException', function(err) {
  console.error('Caught exception: ' + err);
});

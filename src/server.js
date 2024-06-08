const express = require("express");
require("dotenv/config");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const http = require("http"); // Import http module
const socketController = require("./controllers/socketController"); // Import socket controller
// const multer = require("multer");
require("./config/db"); // Import the Mongoose instance from db.js
const router = require("./routes");

// Use body-parser middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");

app.use(
  session({
    secret: "secret-key-@##@123",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(logger("dev"));
app.use(cors());

app.use(bodyParser.json());
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));

app.use("/api", router);

const port = process.env.PORT || 3000;
const server = http.createServer(app); // Create server instance

// Pass server instance to socket controller
socketController(server);

server.listen(port, () => {
  console.log(`🚀🚀 Server running on port http://localhost:${port}`);
});

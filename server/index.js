const express = require("express");
const cors = require("cors");
const dbConnection = require("./db/connection.js");
const apiRouter = require("./routes/routes.js");
const bodyParser = require("body-parser");
const config = require("./config/index.js");

const PORT = process.env.PORT || 5000;

//@initializing App
const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/api", apiRouter);

app.use("/", (req, res, next) => {
  res.send("Backend Running.");
});

// Handle Uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR MESSAGE: ${err.message}`);
  console.log("Shutting Down Server due to Uncaught Exception");
  process.exit(1);
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR MESSAGE: ${err.message}`);
  console.log(`ERROR STACK: ${err.stack}`);
  console.log("Shutting down the server due to Unhandled Promise rejection");
  process.exit(1);
});

//@Starting Server
app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`Listening on port ${PORT}`);
});

// @Connecting to Database
dbConnection();

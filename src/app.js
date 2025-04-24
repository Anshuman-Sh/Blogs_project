const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/index");
const morgan = require("morgan");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const { errorHandler, routeNotFoundError } = require("./middlewares/handlers");

//Parse JSON data
app.use(express.json());

// EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

// Logging
app.use(morgan("dev"));

// Jwt Authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/", routes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  routeNotFoundError(req, res, next);
});

// Error
app.use(errorHandler);

module.exports = app;

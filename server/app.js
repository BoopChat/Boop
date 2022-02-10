var createError = require("http-errors");
const express = require("express");
const path = require("path");
var cookieParser = require("cookie-parser");
const morganLogger = require("./logger/morganLogger");

//environment variables configuration
const dotenv = require("dotenv");
dotenv.config();

// Middleware to verify the jwt
const jwt = require("express-jwt");

//Server routes
var contactsRouter = require("./routes/contacts");
var conversationsRouter = require("./routes/conversations");
var messagesRouter = require("./routes/messages");
var LoginAuthRouter = require("./routes/loginAuth"); //handles login requests

var app = express();

// set the server timezone
// using UTC so times are neutral and can be adjusted to user's timezone in the client
process.env.TZ = "UTC";

// MAY NOT BE NEEDED
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(morganLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("client", "build")));

// Use jwt verification middleware on every request except for the api/login/auth requests.
app.use(
    jwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }).unless((req) => {
        return req.originalUrl.includes("/api/login/auth");
    })
);
app.use("/api/contacts", contactsRouter);
app.use("/api/conversations", conversationsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/login/auth", LoginAuthRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;

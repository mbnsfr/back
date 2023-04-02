var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const ParseServer = require("parse-server").ParseServer;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const api = new ParseServer({
  databaseURI: "mongodb://127.0.0.1:27017/uniserver", // Connection string for your MongoDB database
  // cloud: "",
  appId: "uniservermyAppId",
  masterKey: "uniserverMasterKey", // Keep this key secret!
  fileKey: "optionalFileKey",
  serverURL: "http://localhost:1351/parse", // Don't forget to change to https if needed
  // serverURL: "https://localhost:1351/parse", // Don't forget to change to https if needed
  // javascriptKey: "",
  // restAPIKey: "",
});

app.use("/parse", api);

// app.listen(1351, function() {
//   console.log(`uni-server running on port 1351.`);
// });

module.exports = app;
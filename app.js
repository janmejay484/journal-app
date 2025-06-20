require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://janmejaysi484:JpQRYsCi4oEyNmPU@journal.3fbeq.mongodb.net/?retryWrites=true&w=majority&appName=journal");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require("express-session");
const flash = require("connect-flash");
var indexRouter = require('./routes/index');
const passport = require('passport');
var usersRouter = require('./models/users');
const methodOverride = require('method-override');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));  // This line allows you to use DELETE in forms
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use('/', indexRouter);
app.use(flash());
app.use(expressSession({
  resave:false,
  saveUninitialized:false,
  secret:"hello everyone"
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

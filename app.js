'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fileUpload = require('express-fileupload');

// data Base
const Connection = require('./routes/connection');
const modelDB = require('./model/database-model');

// router API
const registryRouter = require('./routes/api/registyRouter');
const authRouter = require('./routes/api/authRouter');
const userRouter = require('./routes/api/userRouter');
const app = express();

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api',registryRouter );
app.use('/api',authRouter);
app.use('/api',userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let error = createError(404)
  next(error);
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

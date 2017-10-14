const express = require('express');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('./config/db.js');

const app = express();
const authen = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var corsOptions = {
  origin: 'http://localhost:4200',
  method: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  Header: 'Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token'
}

authen.use(cors(corsOptions));
//app.use(authen);

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// require api controller
const index = require('./routes/index');
app.use('/', index); 
require('./routes/UsersRoute.js')(app);
require('./routes/PostRoute')(app);
require('./routes/AreasExperRoute')(app);
require('./routes/EmploySituationRoute')(app);
require('./routes/CityRoute')(app);
// authen.use(require('./middle-wares/verify-token'));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log( r.route.path)
  }
})

module.exports = app;

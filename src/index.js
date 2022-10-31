//const express  = require('express');

//const app = express();

// app.set('port', process.env.PORT || 3000)

// app.listen(app.get('port'), () => {
//     console.log('server on port', app.get('port'))
// });
var createError = require('http-errors');
var express = require('express');
//var cors = require('cors');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api'); //Custom
//var bluebird = require('bluebird');
var fs = require('fs');

//Instancia de servidor express
//var app = express().use('*', cors());;
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Defino rutas de acceso a servicios
app.use('/api', apiRouter);
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'Development') {
  require('./config').config();
}

if (process.env.NODE_ENV === 'production') {
  require('./configProduction').config();
}


//Database connection --
var mongoose = require('mongoose')
//mongoose.Promise = bluebird;
const password = 'DuTiFT7N4FgKMsz3'
const dbname = 'teaviso'
let url = `mongodb+srv://emabel:${password}@teaviso.oyodunu.mongodb.net/${dbname}?retryWrites=true&w=majority`
//console.log("BD",url);
let opts = {
  useNewUrlParser : true, 
  connectTimeoutMS:20000, 
  useUnifiedTopology: true
  };

  // console.log(url);
  // console.log(opts);
mongoose.connect(url,opts)
  .then(() => {
    console.log(`Succesfully Connected to theMongodb Database..`)
  })
  .catch((e) => {
    console.log(`Error Connecting to the Mongodb Database...`),
    console.log(e)
  })
// catch 404 and forward to error handler 
app.use(function (req, res, next) {
  next(createError(404));
});


//CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'Development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Setup server port
var port = process.env.PORT || 3000;
// Escuchar en el puerto
app.listen(port,()=>{
    console.log('Servidor iniciado en el puerto ',port); 
});

module.exports = app;

// user emabel
// pw DuTiFT7N4FgKMsz3
//mongodb+srv://emabel:<password>@teaviso.oyodunu.mongodb.net/?retryWrites=true&w=majority
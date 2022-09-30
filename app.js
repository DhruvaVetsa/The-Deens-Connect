var express = require('express');
var path = require('path');
var session = require('express-session');

var indexRouter = require('./routes/index');
var settingsRouter = require('./routes/settings');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('trust proxy', 1) 
app.use(session({
  secret: 'no secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use('/', indexRouter);
app.use('/settings', settingsRouter);

app.listen(3000);
require('dotenv').config();

// set up ======================================================================
// get all the tools we need
const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const redis = require('redis');
const passport = require('passport');
const flash    = require('connect-flash');
const exphbs = require('express-handlebars');
const morgan       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const session      = require('express-session');
const redisStore = require('connect-redis')(session);

const {
  MONGODB_URI,
  PORT,
  REDIS_URL,
  SESSION_SECRET
} = process.env;

const redisClient  = redis.createClient(REDIS_URL);

// configuration ===============================================================
mongoose.promise = global.Promise
const promise = mongoose.connect(MONGODB_URI, { useNewUrlParser: true }); // connect to our database
promise.then(function(db) {
    console.log('DATABASE CONNECTED!!');
}).catch(function(err){
    console.log('CONNECTION ERROR', err);
});
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.engine('.hbs', exphbs());
app.set('views', __dirname + '/views');
app.set('view engine', '.hbs');

// required for passport
app.use(session({
  secret: SESSION_SECRET,
  cookie: { maxAge: 60000 },
  store: new redisStore({
    client: redisClient,
    ttl :  260
  }),
  resave: false, 
  saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(PORT, function(){
  console.log('The magic happens on port ' + PORT);
});

module.exports = app;

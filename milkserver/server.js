// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var userRoute = require('./routes/user');
var loginRoute = require('./routes/login');
var usereventRoute = require('./routes/userevents');
var eventRoute = require('./routes/event');
var dashboardRoute = require('./routes/dashboard');
// configure app to use bodyParser()
// this will let us get the data from a POST
//Resolve cors prob ionic
var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router


app.use('/user', userRoute);
app.use('/login', loginRoute);
app.use('/event', eventRoute);
app.use('/userevents', usereventRoute);
app.use('/dashboard', dashboardRoute);
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
//app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// include modules
var bodyParser          = require('body-parser');
var cookieParser        = require('cookie-parser');
var express             = require('express');
var LocalStrategy       = require('passport-local').Strategy;
var passport            = require('passport');
var session             = require('express-session');

// initialize express app
var app = express();

var database = {}
//  {
//         "username": "harrison",
//         "password": "bootsandcats",
//         "key_values": [{"key":"value"},{"key1":"value1"}]
//     },

// create user object that contains name, password, key value pairs
// push to database object

passport.use(new LocalStrategy(function(username, password, done) {
   console.log(username);
   if(!database[username]){
        database[username] = {
            username: username,
            password: password,
            key_values:[]
        }
        return done(null, database[username]);
   }
  return done(null, false)
}));              
        
    // var user = {
    //     username: username,
    //     password: password,
    //     key_values: []
    // return done(null, false);
    //                     

    // }


// tell passport how to turn a user into serialized data that will be stored with the session
passport.serializeUser(function(user, done) {
    done(null, user);
});

// tell passport how to go from the serialized data back to the user
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// tell the express app what middleware to use
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// home page
app.get('/', function (req, res) {
    if (req.user) return res.send(database[req.user.username].key_values);
    res.send(401);
});
// health check
app.get('/health', function(req, res){
  res.sendStatus(200)
})
// specify a URL that only authenticated users can hit
app.get('/protected',
    function(req, res) {
        if (!req.user) return res.sendStatus(401);
        res.send('You have access.');
    }
);

// specify the login url
app.post('/login',
    passport.authenticate('local'),
    function(req, res) {
        // console.log(req.body);
        res.send(req.user.key_values);
    });

// log the user out
app.get('/logout', function(req, res) {
    req.logout();
    res.send('You have logged out.');
});

app.put('/', function(req, res){
    if (!req.user) return res.send(401)
    else{
        database[req.user.username].key_values.push({key: req.query.key, value: req.query.value})
        res.send(database[req.user.username].key_values);
    }
})
app.delete('/', function(req, res){
    if(!req.user) return res.send(401)
    else{
       database[req.user.username].key_values = database[req.user.username].key_values.filter(function(keypair){
           return req.query.key !== keypair.key;
       })
       res.send(database[req.user.username].key_values);
    }
})
// start the server listening
app.listen(3000, function () {
    console.log('Server listening on port 3000.');
});
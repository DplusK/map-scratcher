const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')


var Datastore = require('nedb'),
    db = new Datastore({ filename: 'db/database.db' });
db.loadDatabase();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

app.use(session({
    secret: 'process.env.SESSION_SECRET',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());

app.get('/testing', (req, res) => {
    res.redirect('/')
})

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.findOne({ username: username }, function (err, user) {
            if (err) { console.log('err'); return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log(user)
            return done(null, user);
        });
    }
));
passport.serializeUser((user, done) => { })
passport.deserializeUser((user, done) => { })

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    }),
);

module.exports = app
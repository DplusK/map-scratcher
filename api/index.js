const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const flash = require('express-flash')
const session = require('express-session')
var passport = require('passport')
var cors = require('cors')

var NedbStore = require('nedb-session-store')(session);

const passportConfig = require('./passport-config.js')
var store = new NedbStore({
    filename: 'db/session.db'
});

app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(passport.initialize());
app.use(passport.session());


app.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        console.log(req.session)
        console.log(req.user)
        req.logIn(user, function (err) {
            console.log(req.session)
            console.log(req.user)
            if (err) { return next(err); }
            return res.json({
                meta: {
                    error: false
                },
                user: user
            });
        });
    })(req, res, next)
}

    //     , function (err, user) {
    //         req.logIn(user, err => {
    //             if (err) {
    //                 return res.json({
    //                     meta: {
    //                         error: true,
    //                         msg: err
    //                     }
    //                 });
    //             }
    //             return res.json({
    //                 meta: {
    //                     error: false
    //                 },
    //                 user: user
    //             });
    //         });
    //     }
    // )(req, res, next)
);

// app.post('/login',
//     (req, res) => {
//         passport.authenticate('local'
//             , (err, user) => {
//                 if (err) {
//                     return res.send({
//                         meta: {
//                             error: true,
//                             msg: err.msg
//                         }
//                     });
//                 }
//                 if (!user) {
//                     return res.send({
//                         meta: {
//                             error: true,
//                             msg: "Bad credentials"
//                         }
//                     });
//                 }
//                 req.session.authUser = user.username
//                 console.log(req.session)
//                 return res.send(
//                     user
//                 );
//             })(req, res)
//     }
// );


module.exports = app
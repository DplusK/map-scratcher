var Datastore = require('nedb'),
    User = new Datastore({ filename: 'db/database.db' });
User.loadDatabase();

const bcrypt = require('bcrypt');
var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Authentication failed' });
            }
            bcrypt.compare(password, user.password, (err, result) => {
                if (!result) return done(null, false, { message: 'Authentication failed' });
                else return done(null, user);
            })
            // if (user.password != password) {
            //     return done(null, false, { message: 'Authentication failed' });
            // }
            // return done(null, user);
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
    db.findOne({ _id: _id }, function (err, user) {
        done(err, user);
    })
});

var jwt = require('jsonwebtoken');
const authUserSecret = 'process.env.AUTH_USER_SECRET'
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

const tokenExtractor = function (req) {
    let token = null;
    if (req && req.req.headers.cookie) {
        token = req.req.headers.cookie.split('auth._token.local=')[1].split(';')[0].split('Bearer%20')[1];
    }
    return token;
};

passport.use(new JwtStrategy(
    {
        jwtFromRequest: tokenExtractor,
        secretOrKey: authUserSecret
    },
    function (jwt_payload, done) {
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));




module.exports = passport
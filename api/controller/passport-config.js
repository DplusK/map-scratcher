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



// passport.use(new JwtStrategy({
//     jwtFromRequest: tokenExtractor,
//     secretOrKey: authUserSecret
// }, function (jwtPayload, done) {
//     console.log('here')
//     console.log(jwtPayload)
//     return done(null, false)
// }))
const tokenExtractor = function (req) {
    let token = null;
    if (req && req.headers.cookie) {
        token = req.headers.cookie.split('auth._token.local=')[1].split(';')[0];
    }
    console.log(token)
    return token;
};

passport.use(new JwtStrategy(
    {
        jwtFromRequest: tokenExtractor,
        secretOrKey: authUserSecret
    },
    function (jwt_payload, done) {
        console.log('here')
        console.log(jwt_payload)
        // db.findOne({ _id: _id }, function (err, user) {
        User.findOne({ id: jwt_payload.sub }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }
));

// passport.use(new JwtStrategy({
//     jwtFromRequest: tokenExtractor,
//     secretOrKey: authUserSecret
// },
//     function (jwtPayload, done) {
//         return GetUser(jwtPayload.email)
//             .then((user) => {
//                 if (user) {
//                     return done(null, {
//                         email: user.email,
//                     })
//                 } else {
//                     return done(null, false, 'Failed')
//                 }
//             })
//             .catch((err) => {
//                 return done(err)
//             })
//     }
// ))


module.exports = passport
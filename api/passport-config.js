var Datastore = require('nedb'),
    db = new Datastore({ filename: 'db/database.db' });
db.loadDatabase();

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false);
            }
            if (user.password != password) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
});
module.exports = passport
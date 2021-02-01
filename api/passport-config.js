var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('here')
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(JSON.stringify(err)); }
            if (!user) {
                return done(null, false, { message: JSON.stringify('Incorrect username.') });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: JSON.stringify('Incorrect password.') });
            }
            return done(null, user);
        });
    }
));
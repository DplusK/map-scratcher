const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const flash = require('express-flash')
var passport = require('passport')
var cors = require('cors')
var controller = require('./controller/controller.js')
const passportConfig = require('./controller/passport-config.js')

app.use(cors())
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(passport.initialize());

app.post('/register', controller.register)


// app.post('/profile', passport.authenticate('jwt', { session: false }),
//     function (req, res) {
//         console.log('profile')
//         res.send(req.user.profile);
//     }
// );


app.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).send(err)
        } else if (!user) {
            return res.status(403).send(info)
        } else {
            const token = controller.signUserToken(user)
            return res.send({ token })
        }
    })(req, res)
});

app.post('/auth/data', controller.data)

app.get('/auth/logout', (req, res) => {
    req.logout();
    res.send({ message: 'logout' });
})

app.get('/auth/user', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user, message) => {
        console.log(req.user)
        if (err) {
            // you should log it
            return res.status(400).send(err)
        } else if (!user) {
            // you should log it
            return res.status(403).send({ message })
        } else {
            return res.send({ user })
        }
    })(res, req)
})

module.exports = app
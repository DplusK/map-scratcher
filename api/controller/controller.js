var Datastore = require('nedb'),
    User = new Datastore({ filename: 'db/database.db' });
User.loadDatabase();

var jwt = require('jsonwebtoken');
const authUserSecret = 'process.env.AUTH_USER_SECRET'
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.signUserToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, authUserSecret)
}

module.exports.register = (req, res) => {
    var user = req.body.data
    User.find({ username: user.username }, (err, docs) => {
        if (err) return err
        if (docs != '') return res.send({ status: 'error', message: "User already registered" });
        bcrypt.hash(user.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            user.password = hash
            User.insert({ username: user.username, password: user.password })
        });
        res.send({ status: 'success', message: 'Register Successfully' })
    })
}

module.exports.data = (req, res) => {
    console.log('data')
    var data = req.body.data
    if (req.isAuthenticated()) {
        res.send({ message: data });
    } else {
        res.send({ message: 'logout' });
    }
}
var jwt = require('jsonwebtoken');
const authUserSecret = 'process.env.AUTH_USER_SECRET'

module.exports.signUserToken = (user) => {
    return jwt.sign({
        id: user._id,
        email: user.email
    }, authUserSecret)
}
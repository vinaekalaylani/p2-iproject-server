const jwt = require(`jsonwebtoken`)
const secret = 'rahasia'

const createToken = (user) => {
    return jwt.sign(user, secret)
}

const verifyToken = (token) => {
    return jwt.verify(token, secret)
} 

module.exports = {
    createToken,
    verifyToken
}
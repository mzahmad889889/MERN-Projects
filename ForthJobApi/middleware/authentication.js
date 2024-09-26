const User = require('../models/User')
const JWT = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthenticatedError("Authentication invalid")
    }
    const token = authHeader.split(" ")[1]
    try {
        const verifyToken = JWT.verify(token, process.env.JWT_SECRET)
        // const user = User.findById(verifyToken.id).select('-password')
        // req.user = user
        req.user = {userId: verifyToken.userID, name: verifyToken.name}
        next()
    } catch (error) {
        throw new UnauthenticatedError("Authentication invalid")
    }
}

module.exports = auth
const {unauthenticationError} = require('../errors')
const jwt = require('jsonwebtoken')
const authmiddleware = async(req, res, next) => {
    const authHeaders = req.headers.authorization
    if(!authHeaders || !authHeaders.startsWith('Token')){
        throw new unauthenticationError("Not Token Provided")
    }
    const token = authHeaders.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decode
        req.user = {id, username}
        next()
    } catch (error) {
        throw new unauthenticationError("Not allowed unthorized access")
    }
}

module.exports = authmiddleware

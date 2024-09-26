const CustomAPIError = require('./custom-errors')
const {StatusCodes} = require('http-status-codes')
class unauthentication extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = unauthentication
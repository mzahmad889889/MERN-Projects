// const { custom } = require('joi')
// const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  const customError = {
    statusCode : err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something Went Wrong please try again later"
  }
  if(err.name==='ValidationError'){
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',')
    customError.statusCode = 400
  }
  if(err.code && err.code===11000){
    customError.msg = `Already used ${Object.keys(err.keyValue)}, please use another email`
    customError.statusCode = 400;
  }
  if(err.name === 'CastError'){
    customError.msg = `Not found item with id ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandlerMiddleware

const {BadRequestError} = require('../errors')
const jwt = require('jsonwebtoken')
const login = (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new BadRequestError("Please Provide Email or Password")
    }
    const id = new Date().getDate()
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(200).json({msg:'user successfully created', token})
}

const Dashboard = (req, res) => {
    const LuckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg: `Salamualikum, ${req.user.username} you are authorized user`, status:`Your token number is ${LuckyNumber}`})

}

module.exports = {login, Dashboard}
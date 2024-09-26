const mongoose = require('mongoose')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please provide name"],
        minLength: 3,
        maxLength: 50
    },

    email:{
        type: String,
        required:[true, "Please provide Email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide valid Email'],
        unique: true
    },

    password:{
        type:String,
        required:[true, "Please provide password"],
        minLength: 8,
    }
})
userSchema.pre('save', async function(){
    const salt = await bcript.genSalt(10)
    this.password = await bcript.hash(this.password, salt)
})

userSchema.methods.createToken = function() {
    return jwt.sign({userID: this._id, name: this.name},
         process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME})
}

userSchema.methods.comparePassword = async function(typePassword){
    const isMatch = bcript.compare(typePassword, this.password)
    return isMatch
}
module.exports = mongoose.model("User", userSchema);
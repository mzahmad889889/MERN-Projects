const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter your name"],
        trim: true,
        maxlength: [10, "Name must be only 10 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", TaskSchema);
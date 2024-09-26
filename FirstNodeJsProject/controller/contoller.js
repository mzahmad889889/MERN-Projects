const Task = require('../models/Taskschema')
const AsyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-errors')
// Get All Tasks
const getAllPosts = AsyncWrapper(async(req,res) => {

        const tasks = await Task.find({})
        res.status(201).json({tasks})
})

//Get Single Task
const getSingleTask = AsyncWrapper(async(req, res, next) => {
    const {id:taskID} = req.params;
    const task = await Task.findById({_id:taskID})
    if(!task){
        return next(createCustomError(`Task Not Founds with ${taskID}`, 404))
        // return res.status(404).json({msg: `Task Not Found with ${taskID}`})
    }
    res.status(200).json({task})
})

//create Task
const createTask =AsyncWrapper( async(req,res) => { 
        const task = await Task.create(req.body)
        res.status(201).json({task})
})

//update Task
const updateTask =AsyncWrapper( async (req,res) => {
        const {id:taskID} = req.params;
        const updTask = await Task.findByIdAndUpdate({_id:taskID}, req.body, 
            {new: true, runValidators:true}
        )
        if(!updTask){
            return next(createCustomError(`Task Not Found with ${taskID}`, 404))
        }
        res.status(200).json("Task Updated Successfully")
})

const editTask =AsyncWrapper(async(req, res) => {
        const {id:taskID} = req.params;
        const updTask = await Task.findByIdAndUpdate({_id:taskID}, req.body, {new:true, runValidators:true, overWrite: true })
        if(!updTask){
            return next(createCustomError(`Task Not Found with ${taskID}`, 404))
        }
        res.status(200).json("Task Updated Successfully")
})

const deleteTask =AsyncWrapper( async(req,res) => {
        const {id:taskID} = req.params;
        const delTask = await Task.findByIdAndDelete({_id:taskID})
        if(!delTask){
            return res.status(404).json({msg:`Task not found with id ${taskID}`})
        }
        res.status(200).json("Task Deleted Successfully")
})


module.exports = {getAllPosts, getSingleTask, createTask, updateTask, deleteTask, editTask};
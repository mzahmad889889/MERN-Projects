const {getAllPosts, getSingleTask, createTask, updateTask, deleteTask, editTask} = require('../controller/contoller.js')
const express = require('express')

const router = express.Router();

//get all tasks //create task
router.route('/').get(getAllPosts).post(createTask)

//get single task //update task //delete task
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask).put(editTask)



module.exports = router;
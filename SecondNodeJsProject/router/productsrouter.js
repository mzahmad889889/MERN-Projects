const {getAllProdcuts, getAllProductsStatic} = require('../controller/products')
const express = require('express')
const router = express.Router();

//get all tasks //create task
router.route('/products').get(getAllProdcuts)

//get single task //update task //delete task
router.route('/api/v1/products').get(getAllProductsStatic)



module.exports = router;
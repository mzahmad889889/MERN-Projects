const {login, Dashboard} = require('../controller/main')
const authmiddleware = require("../middleware/auth")
const express = require('express')

const router = express.Router()


router.route('/login').post(login)
router.route('/dashboard').get(authmiddleware, Dashboard)


module.exports = router
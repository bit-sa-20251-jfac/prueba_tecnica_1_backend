const express = require('express')
const router = express.Router()
const {getallusers, createuser, userlogin} = require('./../controller/user.controller')



router.get ('/users',getallusers)
router.post ('/createuser',createuser)
router.post ('/login',userlogin)


module.exports = router

const express = require('express')
const router = express.Router()
const {getallusers, createuser, userlogin, finduser, edituser, deleteuser} = require('./../controller/user.controller')



router.get ('/users',getallusers)
router.post ('/createuser',createuser)
router.post ('/login',userlogin)
router.get ('/finduser',finduser)
router.put ('/edituser',edituser)
router.delete ('/deleteuser',deleteuser)

module.exports = router

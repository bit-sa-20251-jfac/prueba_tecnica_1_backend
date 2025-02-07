const express = require('express')
const router = express.Router()

// lista de las rutas

const user = require('./user.routes')
const parentpath = '/api'


router.use (parentpath,user)

module.exports = router
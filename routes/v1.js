const express = require('express')
const router = express.Router()

//Routers
const apiRouter = require('./api/router')


router
    .use('/api', apiRouter)

module.exports = router
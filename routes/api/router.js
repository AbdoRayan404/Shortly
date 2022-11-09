const express = require('express')
const router = express.Router()

//endpoints
const create = require('./create')

router
    .post('/links/create', create)

module.exports = router
import express from 'express';
const router = express.Router()

//endpoints
import register from './register.js'
import login from './login.js'
import token from './token.js'

router
    .post('/register', register)
    .post('/login', login)
    .post('/token', token)

export default router;
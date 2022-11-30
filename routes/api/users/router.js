import express from 'express';
const router = express.Router()

//endpoints
import register from './register.js'
import login from './login.js'
import token from './token.js'
import authenticate from './auth.js';
import validate from '../../middlewares/tokenValidate.js'

router
    .post('/register', register)
    .post('/login', login)
    .post('/token', token)
    .get('/auth', validate, authenticate)

export default router;
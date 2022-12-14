import express from 'express';
const router = express.Router()

//endpoints
import register from './register.js'
import login from './login.js'
import token from './token.js'
import authenticate from './auth.js';
import feedback from './feedback.js'

//middlewares
import validate from '../../middlewares/tokenValidate.js'
import { postLimiter } from '../../middlewares/rateLimiter.js'

router
    .post('/register', postLimiter, register)
    .post('/login', postLimiter, login)
    .post('/token', postLimiter, token)
    .post('/feedback', postLimiter, feedback)
    .get('/auth', validate, authenticate)

export default router;
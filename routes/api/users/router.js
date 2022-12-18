import express from 'express';
const router = express.Router()

//endpoints
import register from './register.js'
import createToken from './createToken.js'
import refereshToken from './refreshToken.js'
import feedback from './feedback.js'
import inspect from './inspect.js';
import updateProfile from './updateProfile.js';
import logout from './logout.js';

//middlewares
import { validator, JWTValidator, loginCredentialsValidator, registerInputValidator  } from '../../middlewares/validators.js';
import { postLimiter } from '../../middlewares/rateLimiter.js'

router
    .post('/register', postLimiter, validator(registerInputValidator), register)
    .post('/login', postLimiter, validator(loginCredentialsValidator), createToken)
    .post('/token', postLimiter, refereshToken)
    .post('/feedback', postLimiter, feedback)
    .post('/profile/update', validator(JWTValidator), updateProfile)
    .get('/profile', validator(JWTValidator), inspect)
    .get('/logout', logout)


export default router;
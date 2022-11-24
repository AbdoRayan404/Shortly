import express from 'express';
export const router = express.Router()

//endpoints
import {create} from './create.js';
import register from './register.js'
import login from './login.js'
import token from './token.js'

//middlewares
import jwtValidate from '../middlewares/tokenValidate.js'

router
    .post('/links/create', jwtValidate, create)
    .post('/user/register', register)
    .post('/user/login', login)
    .post('/user/token', token)
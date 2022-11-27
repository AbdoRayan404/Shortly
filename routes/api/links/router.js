import express from 'express';
const router = express.Router()

//endpoints
import {create} from './create.js';
import inspect from './inspect.js'
import visits from './visits.js'

//middlewares
import jwtValidate from '../../middlewares/tokenValidate.js'

router
    .post('/create', jwtValidate, create)
    .get('/inspect', jwtValidate, inspect)
    .post('/visits', jwtValidate, visits)

export default router;
import express from 'express';
const router = express.Router()

//endpoints
import create from './create.js';
import inspect from './inspect.js'
import visits from './visits.js'

//middlewares
import { validator, JWTValidator, UrlValidator } from '../../middlewares/validators.js';

router
    .post('/create', validator(JWTValidator), validator(UrlValidator), create)
    .post('/visits', validator(JWTValidator), visits)
    .get('/inspect', validator(JWTValidator), inspect)

export default router;
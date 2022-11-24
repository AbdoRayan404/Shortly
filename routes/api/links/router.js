import express from 'express';
const router = express.Router()

//endpoints
import {create} from './create.js';

//middlewares
import jwtValidate from '../../middlewares/tokenValidate.js'

router
    .post('/create', jwtValidate, create)

export default router;
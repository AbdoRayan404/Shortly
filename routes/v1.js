import express from 'express';
export const router = express.Router()

//Routers
import {router as apiRouter} from './api/router.js';

router
    .use('/api', apiRouter)
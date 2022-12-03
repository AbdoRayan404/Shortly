import express from 'express';
const router = express.Router()

//Routers
import apiRouter from './api/router.js';

router
    .use('/api', apiRouter)

export default router;
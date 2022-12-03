import express from 'express';
const router = express.Router()

//api routers
import usersRouter from './users/router.js'
import linksRouter from './links/router.js'

router
    .use('/users', usersRouter)
    .use('/links', linksRouter)

export default router;
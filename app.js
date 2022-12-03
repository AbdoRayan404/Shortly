import express from 'express';
import cookieParser from 'cookie-parser'
const app = express();

//.env config loading
import {} from 'dotenv/config';

//Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// //Routes
import v2 from './routes/v2.js';
app.use('/v2', v2)

//Source files
app.use('/src', express.static('views/src'))

//Views
app.get('/', (req, res)=> res.sendFile(process.cwd() + '/views/landing.html'))
app.get('/login', (req, res)=> res.sendFile(process.cwd() + '/views/login.html'))
app.get('/register', (req, res)=> res.sendFile(process.cwd() + '/views/reg.html'))
app.get('/try', (req, res)=> res.sendFile(process.cwd() + '/views/LCR.html'))
app.get('/team', (req, res)=> res.sendFile(process.cwd() + '/views/team.html'))

//Shortened links
import redirect from './routes/redirect.js'
app.get('/s/:url', redirect)

export default app;
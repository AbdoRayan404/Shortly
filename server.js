import express from 'express';
const app = express();

//.env config loading
import {} from 'dotenv/config';

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// //Routes
import {router as v1} from './routes/v1.js';
app.use('/v1', v1)

//Source files
app.use('/src', express.static('views/src'))

//Views
app.get('/', (req, res)=> res.sendFile(process.cwd() + '/views/landing.html'))
app.get('/try', (req, res)=> res.sendFile(process.cwd() + '/views/LCR.html'))
app.get('/team', (req, res)=> res.sendFile(process.cwd() + '/views/team.html'))

//Shortened links
import redirect from './routes/redirect.js'
app.get('/s/:url', redirect)

app.listen(process.env.PORT || 3000, ()=> console.log('Server is listening on port:', process.env.PORT || 3000))
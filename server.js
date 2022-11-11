const express = require('express');
const app = express();

//.env config loading
require('dotenv').config()

//modules loading
const pool = require('./models/database')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
const v1 = require('./routes/v1')
app.use('/v1', v1)

//Source files
app.use('/src', express.static('views/src'))

//Views
app.get('/', (req, res)=> res.sendFile(__dirname + '/views/landing.html'))
app.get('/try', (req, res)=> res.sendFile(__dirname + '/views/LCR.html'))
app.get('/team', (req, res)=> res.sendFile(__dirname + '/views/team.html'))

//Shortened links
const LinksHandler = require('./models/LinksHandler')
app.get('/s/:url', async (req, res)=>{
    try{
        let original = await LinksHandler.inspect(req.params.url)

        if(original){
            res.redirect(original)
        }else{
            res.sendStatus(400)
        }
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(process.env.PORT || 3000, ()=> console.log('Server is listening on port:', process.env.PORT || 3000))
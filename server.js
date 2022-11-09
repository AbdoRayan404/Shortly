const express = require('express');
const app = express();

//.env config loading
require('dotenv').config()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(process.env.PORT || 3000, ()=> console.log('Server is listening on port:', process.env.PORT || 3000))
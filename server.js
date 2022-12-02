import app from './app.js';


app.listen(process.env.PORT || 3000, ()=> console.log('Server is listening on port:', process.env.PORT || 3000))
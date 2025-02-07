const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/database')
const PORT = process.env.PORT || 3001;
const api = require ('./routes/api.routes')
const cors = require ('cors')
connectDB()


// Iniciar la corrida del servidor y escuchar en el puerto que indique
app.use (cors())
app.use (express.json())
app.use (express.urlencoded({extended:false}))
app.use ('/',api)


app.listen(PORT, ()=>{
    console.log(`escuchando en el puerto: ${PORT}`);
})




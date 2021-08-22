const express = require("express");
require("dotenv").config({path:"variables.env"});
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
const path = require("path")
const moment = require("moment");
moment.locale("es");


// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Conectado a la base de datos"));


const app = express();
const PORT = process.env.PORT || 9000

app.use(cors());
app.use(express.static(path.join(__dirname,"uploads")));


//Habilitar inputs
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(router());






app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});




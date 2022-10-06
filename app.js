const express = require("express");
require("dotenv").config({path:"variables.env"});
const mongoose = require("mongoose");
const router = require("./routes");
const cors = require("cors");
const path = require("path")
const fs = require("fs");
const https = require("https");
const http = require("http");
const moment = require("moment");
moment.locale("es");


// const httpsServerOptions = {
//     key : fs.readFileSync(process.env.KEY_PATH),
//     cert: fs.readFileSync(process.env.CERT_PATH)
// }

// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Conectado a la base de datos"));


const app = express();
const PORT = process.env.PORT || 9000;
const PORT_HTTP = process.env.PORT_HTTP || 80;
const PORT_HTTPS = process.env.PORT_HTTPS || 443;
const IP = process.env.IP; 

// app.use((req,res,next) => {
//     if(req.secure) next(); else res.redirect(`https://${req.headers.host}${req.url}`)
// })


app.use(cors());
app.use(express.static(path.join(__dirname,"uploads")));


//Habilitar inputs
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.use(router());


// const serverHttp = http.createServer(app);
// serverHttp.listen(PORT_HTTP);

// const serverHttps = https.createServer(httpsServerOptions,app);
// serverHttps.listen(PORT_HTTPS);


app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});




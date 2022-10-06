const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const chatBotFacebook = new Schema({

    diaAsesor : {
        type: String,
    },
    primerSaludo : {
        type:Boolean,
    },
    chatComplete:{
        type:Array,

    },
    userFacebook:{
        type:String
   },
    hablarAsesor:{
        type: Boolean,

    },
    interesOpcion1:{
        type:Boolean
    },
    interesOpcion1:{
        type:Boolean
    },
    interesOpcion2:{
        type:Boolean
    },
    interesOpcion3:{
        type:Boolean
    },
    interesOpcion4:{
        type:Boolean
    },
    interesOpcion5:{
        type:Boolean
    },
    interesOpcion6:{
        type:Boolean
    },
    interesOpcion7:{
        type:Boolean
    },
    masInformacion:{
        type:Boolean
    },
    citas:{
        type:Array,  
    },
    userId:{
        type:String
    },

    interesCita:{
        type:Boolean
    },
    diasLaborales:{
        type:Object
    },
    nextAppoimentDay:{
        type:String

    },
    nextAppoimentHours:{
        type:String

    },
    fechaCreaAppoiment:{
        type:String
    },
    name:{
        type:String
    },
    phone:{
        type:String
    },
    enEsperaDeDatos:{
        type:Boolean
    },
    service:{
        type:String
    },
    genero2citasMismoDia:{
        type:Boolean
    }
    
 


    




});


module.exports = mongoose.model("chatbots",chatBotFacebook);
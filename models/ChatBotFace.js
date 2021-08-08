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
    dia:{
        type:Number
    },
    hablarAsesor:{
        type: Boolean,

    },
    interesWeb:{
        type:Boolean
    },
    interesCrecerNegocio:{
        type:Boolean
    },
    interesPaquetes:{
        type:Boolean
    },
    masInformacion:{
        type:Boolean
    },
    interesApp:{
        type:Boolean
    },
 


    




});


module.exports = mongoose.model("chatbots",chatBotFacebook);
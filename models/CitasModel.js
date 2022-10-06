const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const citasSchema = new Schema({

   
    complete:{
        type:String
    },
    fechaCita:{
        type:String
    },
    horaCita:{
        type:String

    },
    fechaCreacion:{
        type:String
    },
    idCreadorCita:{
        type:String

    },
    name:{
        type:String
    },
    phone:{
        type:String

    },
    citasHechas:{
        type:String
    },
    service:{
        type:String
    },
    userId:{
        type:String
    }
    


});

module.exports = mongoose.model("citas",citasSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const answersSchema = new Schema({

    answersSend:{
         type:Object
    },
    idClientFacebook:{
        type:String
    }

});


module.exports = mongoose.model("respuestas",answersSchema);
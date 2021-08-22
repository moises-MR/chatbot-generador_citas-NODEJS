const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({

    name:{
        type:String
    },
    email:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String
    },
    idFacebook:{
        type:String 
    },
    tokenFacebook:{
        type:String 
    },
    realizaCitas:{
        type:Boolean
    },
    daysAndHours:{
        type:Object
    },
    service:{
        type:Array
    },
    chatbotActive:{
        type:Boolean
    },
    imageProfile:{
        type:String
    },
    imageBackgroundWhats:{
        type:String
    }

});


module.exports = mongoose.model("usersApps",userSchema);
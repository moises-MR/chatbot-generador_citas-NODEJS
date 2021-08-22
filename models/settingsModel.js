const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const settingsSchema = new Schema({

   
    imageBanner:{
        type:Array
    },
    imageAndPromotion:{
        type:Array
    }
    


});

module.exports = mongoose.model("settings",settingsSchema);
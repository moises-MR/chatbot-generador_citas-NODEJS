const SettingModel  = require("../models/settingsModel");



exports.imageBannerGet = async  (req,res) => {


   
    
    try {
        const imageBanner = await SettingModel.find()
      
        res.json(imageBanner)
    } catch (error) {
        console.log(error)
    }
}
 
exports.imageBannerPut = async  (req,res) => {
        const data = req.body;  
        const {headers}  = req;

    try {
        await SettingModel.updateOne({_id:headers?._id},data,{new:true})
      
        res.json({status:200})
    } catch (error) {
        console.log(error)
    }
}


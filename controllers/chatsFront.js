const chatBotModel = require("../models/ChatBotFace");
const userModel = require("../models/userModel");
const {sendMessageText } = require("../functions/functionsWebhook")

exports.getChat = async (req,res) => {
    
    const _id = req?.params;
   
    try {
         const users = await chatBotModel.find({userId : _id.id})
         res.json(users);
    } catch (error) {
        res.send(error);
        console.log(error);
    }


}


exports.getOneChat = async (req,res) => {
    const id = req.params.id;

    try {
        const user = await chatBotModel.find({_id:id});
        res.json(user);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}


exports.sendAndUpdateMsssage = async  (req,res) => {

    const chatAndUser = req.body;

        
    try {
        const chats = await chatBotModel.find({_id:chatAndUser._id});
        const userFacebook = chats[0].userFacebook; 
        const chatsApp = await chatBotModel.updateOne({_id:chatAndUser._id},{chatComplete:chatAndUser.chatAsesor,hablarAsesor:true},{new:true});
        const user = await userModel.find({idFacebook:chats[0]?.userId})
        console.log(chatAndUser._id)
        if(chats.length > 0){
            sendMessageText(userFacebook,chatAndUser.message,user[0]?.idFacebook) 
        }

        res.json(chatsApp);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
}
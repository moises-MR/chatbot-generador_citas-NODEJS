const chatBotModel = require("../models/ChatBotFace");
const { receiveMessage } = require("../functions/functionsWebhook")


exports.getWebHook = (req,res) => {

    if(req.query["hub.verify_token"] === "token_priv"){
        res.send(req.query["hub.challenge"]);
        
    }else{
        res.send("No autorizado, rastreando IP...")
    }

}



exports.postWebHook = (req,res) => {

    const data = req.body;
 
    

 if(data.object == "page"){
     data.entry.forEach(entry => {

        entry.messaging.forEach(messagingEvent => {
      
            if(messagingEvent.message){
                receiveMessage(messagingEvent);
               return
            }

            if(messagingEvent.postback){
         

                receiveMessage(messagingEvent);
               return
            }
           
     
        });
      

         
     });
     res.sendStatus(200);
 }

}



const express = require("express");
const request = require("request");
const validationMessageImpulsa = require("./impulsa/impulsaChatbotValidations") 
require("dotenv").config({path:"variables.env"});
const mongoose = require("mongoose");
const chatBotModel = require("./models/ChatBotFace");
const cors = require("cors");
const { Expo } = require('expo-server-sdk')
const moment = require("moment");
moment.locale("es");




const app = express();
const PORT = process.env.PORT || 9000

app.use(cors());

//Habilitar inputs
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Conectar mongodb
mongoose.Promise = global.Promise;
mongoose.connect(process.env.db_URL,
 { useNewUrlParser: true, useUnifiedTopology: true }).then(console.log("Conectado a la base de datos"));



app.listen(PORT,()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});



app.get("/",(req,res)=>{
    res.send("Taller bot")
});








app.get("/users",async(req,res)=>{
    try {
        const users = await chatBotModel.find();
        res.json(users);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

app.get("/user/:id",async(req,res)=>{
    const id = req.params.id;

    try {
        const user = await chatBotModel.find({_id:id});
        res.json(user);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});


app.post("/user/:id",async(req,res)=>{

    const chatAndUser = req.body;
  

    try {
        const user = await chatBotModel.find({userFacebook:chatAndUser.userFacebook});

      
        user.map((user)=>{
           
            user.chatComplete.push(chatAndUser.chatAsesor);
            
         });
       
        const chatsApp = await chatBotModel.updateOne({userFacebook:chatAndUser.userFacebook},{chatComplete:user[0]?.chatComplete},{new:true});
        res.json(chatsApp);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});


app.post("/user",async(req,res)=>{

    const userChat = req.body;
  
    try {
        if(userChat){
            sendMessageText(userChat.id,userChat.message)
        }
         
    } catch (error) {
  
        console.log(error);
    }
});



app.get("/webhook",(req,res)=>{
   
    if(req.query["hub.verify_token"] === "token_priv"){
        res.send(req.query["hub.challenge"]);
        
    }else{
        res.send("No autorizado, rastreando IP...")
    }

});




app.post("/webhook",(req,res)=>{
   
 const data = req.body;
 


 if(data.object == "page"){
     data.entry.forEach(entry => {
        entry.messaging.forEach(messagingEvent => {
            
            if(messagingEvent.message){
                receiveMessage(messagingEvent);
            }
            
        });
     });
     res.sendStatus(200);
 }


});




const receiveMessage = async event =>{
    const  senderId = event.sender.id;
    const messageText = event.message.text;
   


   


    evaluateMessage(senderId,messageText);
}

     
    
    
    
    
    
    

const evaluateMessage = async  (recipientId,message) => {

    let finalMessage = "";

    const formatoFecha = "dddd D MMMM YYYY";
    const hoy = moment()
    // const ayer = moment().subtract(1,"days");




   


     

    let existeUser = await chatBotModel.find({userFacebook:recipientId});


    if(existeUser.length > 0){
     

        if(hoy.format(formatoFecha) !== existeUser[0]?.diaAsesor ){
            //Actualizando dia y hablar con asesor
          
            existeUser.map((user)=>{
                if(user.userFacebook === recipientId){
                    user.hablarAsesor = false,
                    user.diaAsesor = hoy.format(formatoFecha),
                    user.primerSaludo = false
                }
             });
         await chatBotModel.updateOne({_id:existeUser[0]._id},{hablarAsesor:false,diaAsesor:hoy.format(formatoFecha),primerSaludo:false},{new:true});
            // existeUser = await chatBotModel.find({userFacebook:recipientId});
            
        }
    }

 

    
    if(existeUser.length === 0){
        
           finalMessage = await validationMessageImpulsa(message,recipientId,existeUser)
        const crearUser = new chatBotModel({
            primerSaludo:true,
            chatComplete :[{fecha:hoy.format(formatoFecha),chat:{user:message,victoria:finalMessage} }],
            userFacebook:recipientId,
            diaAsesor : hoy.format(formatoFecha),
            hablarAsesor:false,
            interesWeb:false,
            masInformacion: false,
            interesPaquetes : false,
            interesCrecerNegocio : false,
            dia : null
        });
        await crearUser.save();

    }else{

       
        
         

        if(!existeUser[0].hablarAsesor){

        finalMessage = await validationMessageImpulsa(message,recipientId,existeUser);

        //Añadiendo conversaciones al chat
        const newChat = {fecha:hoy.format(formatoFecha),chat:{user:message,victoria:finalMessage} };

        existeUser.map((user)=>{
            if(user.userFacebook === recipientId){
                user.chatComplete.push(newChat)
            }
         });

        await chatBotModel.updateOne({_id:existeUser[0]._id},{chatComplete:existeUser[0].chatComplete},{new:true});

        }else{


            return
            
        }
        
        
    }
    
   

  
     sendMessageText(recipientId,finalMessage);
}


const callSendApi = (messageData) => {
    request({
        uri:"https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token : process.env.APP_TOKEN},
        method:"POST",
        json: messageData
    },(error,response,data)=>{
        if(error){
            
            console.log("No fue posible enviar en mensaje");

        }else{
            // console.log(response)
            console.log("El mensaje fue enviado");
        }
    })
}



const sendMessageText= (recipientId,message) =>{
    let messageData = {
        recipient:{
            id:recipientId
        },
        message:{
            text: message
        }
    }
  
    callSendApi(messageData);
}
















const sendMessageImage = (recipientId) =>{

let messageData = {
        recipient:{
            id:recipientId
        },
        message:{
            attachment:{
                type: "image",
                payload:{
                    url:"http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQVZdAsNqwMMaJNLq-qHKIU2mf-_UUigz1ZhdhL9o3OhRhOliyirtrsiz3fzGSTtS_eRdulxhPvVSm4P02ttLs"
                }
            }
        }
    }

    callSendApi(messageData);
}







function sendButtonMessage(recipientId) {
    var messageData = {
      recipient: {
        id: recipientId
      },
      message: {
        attachment: {
          type: "template",
          "payload": {
                  "template_type": "generic",
                  "elements": [{
                      "title": "Chat-bot de prueba.",
                      "subtitle": "Es un increible chatbot perzonalizado para tu negocio.",
                      "image_url": "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcQVZdAsNqwMMaJNLq-qHKIU2mf-_UUigz1ZhdhL9o3OhRhOliyirtrsiz3fzGSTtS_eRdulxhPvVSm4P02ttLs",
                      
                      "buttons": [{
                          "type": "web_url",
                          "url": "https://google.com",
                          "title": "Leer más (+)"
                      },{
                        "type": "postback",
                        "payload": "true",
                        "title": "sii quiero"
                    }],
                  }]
              }
        }
      }
    };  
   
    callSendApi(messageData);
  }







  




  


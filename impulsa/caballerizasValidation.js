const userModel = require("../models/userModel");
const request = require("request");


module.exports =  caballerizasDesmotablesValidation = async (message,idClientFacebook,existeUser,recipientId ) => {


  
  // console.log(recipientId)
  // console.log(idClientFacebook)
  // console.log(existeUser)

  const  finalMessage = "Hola que tal con gusto te brindo mas informacion, Contamos con 2 medidas 3 y 4 metros                                                                                                                               Los precios por pared o panel básico son los siguientes:                                                                                                          3 mts. $6,500                                                                                                                         4 mts. $7,500                                                                                                                                                                                                                                                        *El techo en caso de necesitarlo, es de lámina (galvanizada, pintro y galvateja ) y tiene un costo aparte.                                                                                                                                                                                                                                                       *Los precios no incluyen instalación y flete.                                                                                                                                                                                                                                                       *La pared con diseño y/o herrajes laboriosos en caso de interesarle tiene un costo de 2,500 pesos extra. Estamos ubicados en zapopan jalisco."

           

    if(existeUser.length === 0){
      console.log("si entro")
        //Es primera vez que manda mensaje el usuario
        sendMessageText(recipientId,finalMessage,idClientFacebook)
        sendButtonMessage(recipientId,idClientFacebook)
          

    }
    


 


}



const callSendApi = async (messageData,idClientFacebook) => {

    const TOKENIDFACE = await userModel.findOne({idFacebook:idClientFacebook});
  


    request({
        uri:"https://graph.facebook.com/v2.6/me/messages",
        qs: {access_token : TOKENIDFACE?.tokenFacebook},
        method:"POST",
        json: messageData
    },(error,response,data)=>{
        if(error){
               
            console.log("No fue posible enviar en mensaje");

        }else{
            console.log("El mensaje fue enviado");
        }
    })
}




const sendMessageText= (recipientId,message,idClientFacebook) =>{
    let messageData = {
        recipient:{
            id:recipientId
        },
        message:{
            text: message
        }
    }
  
    callSendApi(messageData,idClientFacebook);
}



const sendButtonMessage = (recipientId,idClientFacebook) => {
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
                      "title": "¿ Quieres ver nuestros modelos ?",
                      "buttons": [{
                        "type": "web_url",
                        "url":"https://caballerizasdesmotables.netlify.app/#catalogo",
                        "title": `VER CATALOGO`
                      },
                      {
                        "type": "web_url",
                        "url":"https://api.whatsapp.com/send?text=Hola me podrias dar mas informacion&phone=+523331982114",
                        "title": `WhatssApp`
                      }],
                  }]
              }
        }
      }
    };  
    
    callSendApi(messageData,idClientFacebook);
  }








// // Quita los acentos 
// const removeAccents = (str) => {
//     return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
//   } 


// const isCotaint = (sentece,array) => {

//     let encontrado = false;
//     sentece = sentece?.toLocaleLowerCase();
//     sentece = removeAccents(sentece); 
//     array.forEach(element => {
//       const econtro = sentece.indexOf(element) > -1;

//       if(econtro){

//         encontrado = true;
//         return
//       }
      

//    });


// return encontrado;
// }


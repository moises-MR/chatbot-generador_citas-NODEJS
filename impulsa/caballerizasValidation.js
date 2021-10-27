const userModel = require("../models/userModel");
const chatBotModel = require("../models/ChatBotFace");
const request = require("request");


module.exports =  caballerizasDesmotablesValidation = async ( event ) => {


  const { recipient, sender  } = event;

  // console.log("evento completo " + event + "        ******** evento completo ")
  // console.log("recipient " + recipient +"           *******  recipient ")
  // console.log("sender "+sender +"     ***** sender ")
 
  let existeUser = await chatBotModel.find({userFacebook:sender?.id,userId:recipient?.id});

console.log(existeUser)
  const  finalMessage =     `Hola qué tal con gusto te brindo más informacion
  Contamos con 2 medidas estándar 3 y 4 mtrs 
  Los precios son por panel o pared.
  Modelo
  Ocotla o Cajititlán 
  3 mtrs $6,800
  4 mtrs  $7,800
  Cuyutlan 
  3 mtr   $ 6,500
  4 mtr   $7,500
  Tonala y tequila 
  3 mtr   $6,200
  4 mtr   $7,200
  TAPALPA 
  3 mtr    $ 8,500
  4 mtr    $9,500
  Paneles frontales sube $500
  *El techo en caso de necesitarlo, es de lámina (galvanizada, pintro, galvateja, o pvc) y tiene costo aparte 
  *Los precios no incluyen instalación y flete.
  Estamos ubicados en Tonalá jalisco 
  Precios sujeto a cambio sin previo aviso`

           

    if(existeUser.length === 0){
      console.log("Si entro")
        //Es primera vez que manda mensaje el usuario
        sendMessageText(sender?.id,finalMessage,recipient?.id)
        sendButtonMessage(sender?.id,recipient?.id)
          

    }
    



 


}



const callSendApi = async (messageData,idClientFacebook) => {

    const TOKENIDFACE = await userModel.findOne({idFacebook:idClientFacebook});
    console.log("TOKEN" + TOKENIDFACE);


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
                        "url":"https://www.caballerizasdesmontables.com/#catalogo",
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


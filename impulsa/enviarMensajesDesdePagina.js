const userModel = require("../models/userModel");
const chatBotModel = require("../models/ChatBotFace");
const request = require("request");



const callSendApi = async (messageData,idClientFacebook) => {

  const TOKENIDFACE = await userModel.findOne({idFacebook:idClientFacebook});



  request({
      uri:"https://graph.facebook.com/v2.6/me/messages",
      qs: {access_token : TOKENIDFACE?.tokenFacebook},
      method:"POST",
      json: messageData
  },(error,response,data)=>{
    // console.log(response);

      if(error){
          console.log("No fue posible enviar en mensaje");

      }else{
          console.log("El mensaje fue enviado");
      }
  })
}




const sendMessageText= (recipientId,message,idClientFacebook) =>{

    const miId = "111284933760445";
    console.log(recipientId);
  let messageData = {
      recipient:{
          id:recipientId
      },
      message:{
          text: message
      }
  }

  callSendApi(messageData,miId);
}



module.exports = enviarMessagePorPagina = async (event) => {

    const { recipient, sender  } = event;



    const finalMessage = "puto";

    sendMessageText("109412301547811",finalMessage,recipient?.id)



    console.log("por aqui");

}
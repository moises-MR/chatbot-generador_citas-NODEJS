
const userModel = require("../models/userModel");
 


module.exports =  validationHours = async (chatComplete,diaCita) => {

 const user = await userModel.find({idFacebook:chatComplete[0].userId})
const message = [] 

 if(user){

    user[0].daysAndHours.horasCompletas.forEach(element => {
     
        message.push( element.hora)
 
    });
 }
//  const hrsString = (message.join('                                                                             -                                                                             '))

 return  message;
}
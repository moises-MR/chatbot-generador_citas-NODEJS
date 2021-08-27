const chatBotModel = require("../models/ChatBotFace");
const AnswersModel = require("../models/AnswersModel");
const userModel = require("../models/userModel");
require("dotenv").config({path:"variables.env"});
const moment = require("moment");
moment.locale("es")







module.exports =  validationMessageImpulsa  = async  (message,idClientFacebook,existeUser) => {

    let finalMessage = "";



    const answersClient = await AnswersModel.find({idClientFacebook})
    
        
    if (answersClient.length === 0){
            return finalMessage = "Hola soy victoria una inteligencia artificial y estas apunto de contar con mis servicios NOS VEMOS PRONTO !!"
    }
   

  











    
 
    if(existeUser.length === 0){
        // Primera vez que habla al chat
        finalMessage = answersClient[0]?.answersSend.answersDefault;    

    }else{





            // Ya existe conversacion con el usuario
            //Validamos si no existe el primer saludo del dia y si no existe lo hacemos y actualizamo primer saludo a true
            if(!existeUser[0]?.primerSaludo){
          
            await chatBotModel.updateOne({_id:existeUser[0]?._id},{primerSaludo:true},{new:true});
            finalMessage = answersClient[0]?.answersSend.SaludarNuevamente

            }else{
   
            
            //Hacemos validaciones de las opciones que se le dieron primero validando si quiere hablar con asesor
            if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcionAsesor.arrayOptions)){
                //Ya existe el primer saludo del dia
         
                //Si quiere hablar con un asesor
                await chatBotModel.updateOne({_id:existeUser[0]?._id},{hablarAsesor:true},{new:true})
                return  finalMessage = answersClient[0]?.answersSend.answersArrays.opcionAsesor.message;
            }



            // Quiere de nuevo el menu de opciones
            if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcionMenuPrincipal.arrayOptions)){


             return finalMessage = answersClient[0]?.answersSend.answersArrays.opcionMenuPrincipal.message

            }


            

             
            
            //Validando la opcion de la pagina web si es que quiere algo reliazionado
            if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion1.arrayOptions)){
            //Primer mensaje de las opciones WEB
            await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion1:true,masInformacion:true},{new:true});
             return finalMessage = answersClient[0]?.answersSend.answersArrays.opcion1.message;
            }
            


                // Opcion vender mas tengo negocio
                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion2.arrayOptions)){
                    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion2:true,masInformacion:true},{new:true});
                    return finalMessage = answersClient[0]?.answersSend.answersArrays.opcion2.message   

                }


               

                //Opcion promocion del mes
                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion4.arrayOptions)){

                    return finalMessage = answersClient[0]?.answersSend.answersArrays.opcion4.message
                }







                //Opcion necesito una APP
                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion6.arrayOptions)){
                        await chatBotModel.updateOne({_id:existeUser[0]?._id},{interesOpcion6:true},{new:true});
                        return finalMessage = answersClient[0]?.answersSend.answersArrays.opcion6.message
                }




               

                //Opciones mas informacion quiere informacion desde la primera lista sin seleccionar nada mas
                if(existeUser[0]?.masInformacion === false && isCotaint(message,answersClient[0]?.answersSend.answersArrays.masInformacion.arrayOptions)){

                    

                    return  finalMessage = answersClient[0]?.answersSend.answersArrays.masInformacion.message;

                }



                 


           
                //PAQUETES
                if(existeUser[0]?.interesOpcion3 && existeUser[0].masInformacion){
                
                     //informacion de paquetes basico
                     if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.paqueteBasico.arrayOptions)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion3:false},{new:true});
                        return  finalMessage = answersClient[0]?.answersSend.answersArrays.paqueteBasico.message;
                     }


                     //informacion de paquetes premiun
                    if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.paquetePremium.arrayOptions)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion3:false},{new:true});
                        return  finalMessage = answersClient[0]?.answersSend.answersArrays.paquetePremium.message;
                     }



                      //informacion de paquetes perzonalizado
                    if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.paquetePerzonalizado.arrayOptions)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion3:false},{new:true});
                        return  finalMessage = answersClient[0]?.answersSend.answersArrays.paquetePerzonalizado.message
                     }

                     if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcionVictoria.arrayOptions)){

                        return finalMessage = answersClient[0]?.answersSend.answersArrays.opcionVictoria.message
                    }

                }



                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcionVictoria.arrayOptions)){

                    return finalMessage = answersClient[0]?.answersSend.answersArrays.opcionVictoria.message
                }


                // Quiero conocer paquetes  ** este va abajo por que necesita validar si ya pidio informes del paquete y necesita un paquete de otra manera entra aqui perimero y no muestra el paquete
                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion3.arrayOptions)){
                    
                    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion3:true,masInformacion:true},{new:true});
                    return finalMessage = answersClient[0]?.answersSend.answersArrays.opcion3.message       
 
                }

              

                    //Validar si quiere la opcion de ecommerce
                if(isCotaint(message,answersClient[0]?.answersSend.answersArrays.opcion5.arrayOptions)){
                    
                    return finalMessage =  answersClient[0]?.answersSend.answersArrays.opcion3.message

                }



              

     
                const realizaCitas = await userModel.findOne({idFacebook:existeUser[0]?.userId})
             
                if( realizaCitas.realizaCitas && isCotaint(message,answersClient[0]?.answersSend.answersArrays.interesCita.arrayOptions) ){

           
                  

                    

                    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesCita:true,masInformacion:true},{new:true});
                     return finalMessage =  answersClient[0]?.answersSend.answersArrays.interesCita.message
                    


                    
                
                }





                //Quiere informacion pero ya tiene activo el mas info 
                if(existeUser[0]?.masInformacion && isCotaint(message,answersClient[0]?.answersSend.answersArrays.masInformacion.arrayOptions) ){


                        //Validando que tipo de informacion quiere



                        //informacion de sitios WEB
                        if(existeUser[0]?.interesOpcion1){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion1:false},{new:true});
                         return  finalMessage = answersClient[0]?.answersSend.answersArrays.interesOpcion1.message;
                        }


                        //informacion de crecer negocio
                        if(existeUser[0]?.interesOpcion2){
                            await chatBotModel.updateOne({_id:existeUser[0]._id},{interesOpcion:false},{new:true});
                            return  finalMessage = answersClient[0]?.answersSend.answersArrays.interesOpcion2message;
                         }
  
                }



















                //No entendi nada de lo que me dijo
                finalMessage = answersClient[0]?.answersSend.answersArrays.sinOpcion.message

            }     


        
    };
   




    
   







    






















        

   
      

    return finalMessage;
}
    



 
    
   




// Quita los acentos 
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  } 


const isCotaint = (sentece,array) => {

    let encontrado = false;
    sentece = sentece?.toLocaleLowerCase();
    sentece = removeAccents(sentece); 
    array.forEach(element => {
      const econtro = sentece.indexOf(element) > -1;

      if(econtro){

        encontrado = true;
        return
      }
      

   });


return encontrado;
}






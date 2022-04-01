const shortid = require('shortid');
const moment = require("moment");
moment.locale("es");
const request = require("request");
const chatBotModel = require("../models/ChatBotFace");
const CitasModel = require("../models/CitasModel");
const userModel = require("../models/userModel");
// si se utiliza no borrar
const AnswersModel = require("../models/AnswersModel");
const validationsDay = require("../functions/validationsDays")
const validationsHours = require("../functions/validationsHours")

//Validaciones de respuestas
const validationMessageImpulsa = require("../impulsa/impulsaChatbotValidations") 
const caballerizasValidation = require("../impulsa/caballerizasValidation") 



//variables globables en las funciones 
const formatoFecha = "dddd D MMMM YYYY";
const hoy = moment()
const arrayDays = ["lunes","martes","miercoles","jueves","viernes","sabado","domingo"];
const arrayHours = ["hrs"];



exports.receiveMessage = async event =>{

    const senderId = event?.sender.id;
    const messageText = event?.message?.text;
    const idClientFacebook = event.recipient.id;
    const chat = await chatBotModel.find({userFacebook:senderId});
    const user = await userModel.find({idFacebook:idClientFacebook})


      
    const servicios = user[0]?.service;
    const postbackParaEvitarUndefined = event?.postback?.title || "%%%%%%";

  
    if(user[0]?.chatbotActive === false){
      return
    }


 

    const createAppoiment = {
        complete:"Pendiente",
        fechaCita:chat[0]?.nextAppoimentDay,
        horaCita:chat[0]?.nextAppoimentHours,
        fechaCreacion:hoy.format("dddd DD MMMM"),
        idCreadorCita:chat[0]?.userFacebook,
        name:chat[0]?.name,
        phone:messageText || chat[0]?.phone,
        citasHechas:chat[0]?.citas.length,
        service: event?.postback?.title || chat[0]?.service,
        userId:idClientFacebook
    } 


    
  
    if (hoy.format("dddd DD MMMM") != chat[0]?.fechaCreaAppoiment) {
      await chatBotModel.updateOne(
        { userFacebook: senderId },
        {
          service: null,
          fechaCreaAppoiment: null,
          nextAppoimentHours: null,
          nextAppoimentDay: null,
          genero2citasMismoDia:false
        },
        { new: true }
      );
   
    }
    
    
    // console.log(dato)
    if(chat[0]?.enEsperaDeDatos){

        //Envio mensaje por postback y lo recivo en postback la respuesta del cliente 
        if(chat[0]?.service === null){
            const message = "¿ Que servicio te interesa ?";

            await chatBotModel.updateOne({userFacebook:senderId},{service:"",name:messageText},{new:true});
            servicios.forEach(element => {
                oneButtonMessage(senderId,idClientFacebook,element,message);
            });
            return
        }
        
        if(isCotaint(postbackParaEvitarUndefined,servicios) && chat[0]?.phone === null){
            

            const message = "Por ultimo me proporcionas un numero telefonico de contacto por favor"
            await chatBotModel.updateOne({userFacebook:senderId},{service:event?.postback?.title},{new:true});
            sendMessageText(senderId,message,idClientFacebook)
           }else{

          



            
           
        
            chat.map((element)=>{
                element.citas.push(createAppoiment)
            })

           const citaApi = new CitasModel(createAppoiment) 
           await citaApi.save();

            if(chat[0]?.phone === null){
                const message = `Gracias por tu preferencia ${chat[0]?.name.toUpperCase()} tu cita a sido agendada para ${chat[0]?.nextAppoimentDay} en este horario ${chat[0]?.nextAppoimentHours} fue un placer atenderte.`
         await chatBotModel.updateOne(
              { userFacebook: senderId },
              {
                phone: messageText,
                enEsperaDeDatos: false,
                citas: chat[0]?.citas,
                fechaCreaAppoiment: hoy.format("dddd DD MMMM"),
                genero2citasMismoDia:true

              },
              { new: true }
            );
        
            sendMessageText(senderId,message,idClientFacebook)
            return
            }
           }

       return
    }
  

   if(event?.postback){
       
 
    

    if(event?.postback.title === "SI"){

        await chatBotModel.updateOne(
          { userFacebook: senderId },
          {
            nextAppoimentDay: null,
            fechaCreaAppoiment: null,
            service: null,
            nextAppoimentHours: null,
          },
          { new: true }
        );

        evaluateMessage(senderId,"cita",idClientFacebook);
        return
   }


    if (chat[0]?.nextAppoimentDay === null) {
        
      if (isCotaint(event?.postback.title, arrayDays)) {
        const dayRespuesta = await validationsHours(chat, event.postback.title);
        await chatBotModel.updateOne(
          { userFacebook: senderId },
          {
            nextAppoimentDay: event?.postback.title,
            fechaCreaAppoiment: hoy.format("dddd DD MMMM")
          },
          { new: true }
        );
        // saber en que horarios labora y enviarlos
        dayRespuesta.forEach((element) => {
          oneButtonMessage(senderId, idClientFacebook, element);
        });
      }
    } else {

      if (
        isCotaint(event?.postback.title, arrayHours) &&
        chat[0]?.nextAppoimentHours != null
      ) {
        oneButtonMessage(
          senderId,
          idClientFacebook,
          "SI",
          "Ya seleccionaste una hora quieres modificar tu cita ?"
        );
        return;
      }

      
      if (isCotaint(event?.postback.title, arrayHours)) {

        if (chat[0]?.name === null) {
          const message = `A nombre de quien registro la cita ?`;
          await chatBotModel.updateOne(
            { userFacebook: senderId },
            {
              nextAppoimentHours: event?.postback.title,
              enEsperaDeDatos: true,
            },
            { new: true }
          );
          sendMessageText(senderId, message, idClientFacebook);
        } else {
          //Envio mensaje por postback y lo recivo en postback la respuesta del cliente

             
            if (chat[0]?.service === null && chat[0]?.name !== null) {
                const message = "¿ Que servicio te interesa ?";
    
                await chatBotModel.updateOne(
                  { userFacebook: senderId },
                  { nextAppoimentHours: event?.postback.title},
                  { new: true }
                );
                servicios.forEach((element) => {
                  oneButtonMessage(senderId, idClientFacebook, element, message);
                });
          
            return;
          }

          
        }
        return;
      }
      
     
      if(isCotaint(event?.postback.title, servicios)){
        
   
         
        if(chat[0]?.services !== null && chat[0]?.enEsperaDeDatos === false ){
            

          
          const citasCreadas =  await CitasModel.find({idCreadorCita:senderId});
          let _id = ""
          if(citasCreadas.length > 0){
            
            citasCreadas.forEach(async(e)=>{
              if(e.fechaCreacion === hoy.format("dddd DD MMMM")){

                _id = e._id
                // console.log(_id)
              }
            });
            

            if(_id == ""){
              const newAppoiment = new CitasModel(createAppoiment);
              newAppoiment.save();
            }else{
              await CitasModel.updateOne({_id},createAppoiment,{new:true})
            }
           
          }else{
            const newAppoiment = new CitasModel(createAppoiment);
            newAppoiment.save();
          }

        

            const message = `Gracias por tu preferencia ${chat[0]?.name.toUpperCase()} tu cita a sido agendada para ${chat[0]?.nextAppoimentDay} en este horario ${chat[0]?.nextAppoimentHours} fue un placer atenderte.`;
            await chatBotModel.updateOne(
              { userFacebook: senderId },
              { enEsperaDeDatos: false, 
                service: event?.postback.title ,
                citas:chat[0]?.citas,
                phone:chat[0]?.phone,
                fechaCreaAppoiment : hoy.format("dddd DD MMMM")    },
              { new: true }
            );
            sendMessageText(senderId, message, idClientFacebook);



          }
          return
      }
      






      // ya registro verificar si es del mismo dia o no
      if (hoy.format("dddd DD MMMM") === chat[0]?.fechaCreaAppoiment) {
        oneButtonMessage(
          senderId,
          idClientFacebook,
          "SI",
          "Ya seleccionaste una fecha el dia de hoy quieres modificar ?"
        );
      }
    }
        
  
    
     
    

       return
   }
  
    evaluateMessage(senderId,messageText,idClientFacebook,event);



    switch (idClientFacebook) {

      case "474805742856301":
       caballerizasValidation(event)
        break;
    
      default:
        break;
    }


    





}




const evaluateMessage = async  (recipientId,message,idClientFacebook,event) => {

    let finalMessage = "";

    
    // const ayer = moment().subtract(1,"days");
    // .format("dddd");
  



 
   


     

    let existeUser = await chatBotModel.find({userFacebook:recipientId,userId:idClientFacebook});

 

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
        
        // Valida que chat necesita utilizar para contestar

        
        switch (idClientFacebook) {

          case "111284933760445":
            finalMessage = await validationMessageImpulsa(message,idClientFacebook,existeUser)
            break;
          
          // case "474805742856301":
          //   finalMessage = await caballerizasValidation(message,idClientFacebook,existeUser,recipientId,event)
          //   break;
        
          default:
            break;
        }

        const crearUser = new chatBotModel({

          primerSaludo: true,
          chatComplete: [

            {
                _id: shortid.generate(),
                text: message,
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: recipientId,
                  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU',
                },
            },
            {
                _id: shortid.generate(),
                text: finalMessage,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'Victoria',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              },

          ],
          userFacebook: recipientId,
          diaAsesor: hoy.format(formatoFecha),
          hablarAsesor: false,
          interesOpcion1: false,
          interesOpcion2: false,
          interesOpcion3: false,
          interesOpcion4: false,
          interesOpcion5: false,
          interesOpcion6: false,
          interesOpcion7: false,
          masInformacion: false,
          citas:[],
          userId:idClientFacebook,
          interesCita:false,
          nextAppoimentDay:null,
          nextAppoimentHours:null,
          fechaCreaAppoiment:null,
          name:null,
          phone:null,
          enEsperaDeDatos:false,
          service:null,
          genero2citasMismoDia:false
        });
        await crearUser.save();

    }else{

       
        
         

        if(!existeUser[0].hablarAsesor){

          switch (idClientFacebook) {

            case "111284933760445":
              finalMessage = await validationMessageImpulsa(message,idClientFacebook,existeUser)
              break;
            
            // case "474805742856301":
            //   finalMessage = await    caballerizasValidation(message,idClientFacebook,existeUser,recipientId,event)
            //   break;
          
            default:
              break;
          }

        

        //Añadiendo conversaciones al chat
        
        const newChatUser = {
            _id: shortid.generate(),
            text: message,
            createdAt: new Date(),
            user: {
              _id: 1,
              name: recipientId,
              avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU',
            },
        }

        const newChatVictoria = {
            _id: shortid.generate(),
            text: finalMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Victoria',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }

        existeUser.map((user)=>{
            if(user.userFacebook === recipientId){
                
                user.chatComplete.push(newChatUser);
                user.chatComplete.push(newChatVictoria);
            }
         });

        await chatBotModel.updateOne({_id:existeUser[0]._id},{chatComplete:existeUser[0].chatComplete},{new:true});

        }else{

            const newChatUser = {
                _id: shortid.generate(),
                text: message,
                createdAt: new Date(),
                user: {
                  _id: 1,
                  name: recipientId,
                  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzPb_pSj-ir-9eB6mi0lVJdQP1KKHiB8fRBS1CbmOXGd9Z1FEGMJHbEKhahwhWLGSaEXY&usqp=CAU',
                },
            }
    
            const newChatVictoria = {
                _id: shortid.generate(),
                text: "Respuesta hecha en facebook por un asesor",
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: 'Victoria',
                  avatar: 'https://placeimg.com/140/140/any',
                },
              }
    
            existeUser.map((user)=>{
                if(user.userFacebook === recipientId){
                    
                    user.chatComplete.push(newChatUser);
                    user.chatComplete.push(newChatVictoria);
                }
             });
    
            await chatBotModel.updateOne({_id:existeUser[0]._id},{chatComplete:existeUser[0].chatComplete},{new:true});
             
            return
            
        }
        
        
    }
    
   
    // const answersSend = {
        
    //     answersDefault : "Hola gracias por ponerte en contacto con IMPULSA 🚀, soy VICTORIA tu asistente virtual 🤖 un gusto saludarte en que te puedo ayudar :                                                          1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico o por un solo pago $399 MXN ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                                  ( PAQUETE VICTORIA ó CHATBOT ) 🤖💬",
    //     SaludarNuevamente : "Hola de nuevo 👋 gracias por volverte a ponerte en contacto con IMPULSA 🚀, soy VICTORIA tu asistente virtual 🤖 un gusto volverte a saludar en que te puedo ayudar :                                                          1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico o por un solo pago $399 MXN ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                               ( PAQUETE VICTORIA ó CHATBOT ) 🤖💬",
    //     answersArrays:{
    //         opcionAsesor:{
    //             message:"Estoy contactando a uno de nuestros asesores 👨‍💼👩‍💼, para que pueda atender todas tus dudas en un momento te atenderan........",
    //             arrayOptions:["hablar con asesor","acesor","asesor","acecor","asesores","acesores","acecores",7,"siete","ciete","7","ultima opcion","opcion ultima","opcion 7","opsion 7","contactar asesor","contactar con asesor","hablar con alguien","hablar","ablar"]
    //         },
    //         opcionMenuPrincipal:{
    //             message:"1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico o por un solo pago $399 MXN ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                                                ( PAQUETE VICTORIA ó CHATBOT ) 🤖💬",
    //             arrayOptions: ["menu principal","menu de opciones","menu opciones","lista de opciones","lista opciones","menu"],
    //         },
    //         opcion1:{
    //             message:"📱¡Es el momento de que tu negocio este en las Redes!🚀                                                                          Creamos paginas web modernas, adaptables a cualquier dispositivo ya sea computadora, tableta o dispositivo movil.                                                                                                   No esperes mas es tiempo de IMPULSAR🚀 tu negocio a la era digital.                                                                                                          Quieres mas informacion ?",
    //             arrayOptions:["necesito una pagina web","pagina web","quiero una web","opcion 1","opsion 1",1,"paginas web","una web"]
    //         },
    //         opcion2:{
    //             message:"Quieres vender mas ? 💰💸💲                                                                                           Somos expertos en la creacion de campañas publicitarias de alto impacto, nos especializamos en el creciemiento 💹 de marcas  y productos  para acercarte a tus clientes potenciales.                                                                                  Quieres mas informacion, pideme contactarte con alguno de nuestros asesores 👨‍💻👩‍💻 para que IMPULSES 🚀 tu negocios hacia el futuro.",
    //             arrayOptions:["vender mas","incrementar mis ventas","subir ventas","vender online","ventas en linea","campanas de ventas","camapanas publicitarias","seo","camapanas marketing",2,"opcion 2","segunda opcion","opsion 2","2","ventas","tengo un negocio","negocio"]
    //         },
    //         opcion3:{
    //             message:"Sabemos que todos los negocios son diferentes, y que tienen distintas necesidades es por eso que contamos con 3 paquetes 📦 a la medida para ti:                                                                       PAQUETE BASICO 🏷,                                                                  PAQUETE PREMIUM 💎,                                                                          PAQUETE PERZONALIZADO 🆒,                                                             ¿Cuál paquete te interesa?                                                                                       Todos los paquetes vienen incluidos con el servicio del CHAT-BOT VICTORIA, nos adaptamos a cualquier tipo de negocio o necesidades.",
    //             arrayOptions:["paquetes","paquete",3,"3","opcion 3","opsion 3"]
    //         },
    //         opcion4:{
    //             message:"Este mes de septiembre tenemos los sitios web 🌐 básicos, adaptables a todo tipo de dispositivo ya sean tabletas, móviles 📱 o pc 💻, además hospedaje para tu pagina web y dominio por un año GRATIS por tan solo $ 2,999,  ¿te interesa? Dime ( contactar con un asesor ) para mas información. ",
    //             arrayOptions:["promo del mes","promocion mes","promosion del mes","promocion del mes","opcion 4",4,"4","promociones del mes","promosiones del","promociones"]
    //         },
    //         opcion5:{
    //             message:"➡Empieza a vender en Línea tus productos o servicios👏🏼😄📱 Diseñamos tu tienda virtual,  diseño de logotipo, incluye:                                                         hospedaje y cuentas de email,                                                                Asistente virtual las 24hrs en tu tienda virtual(Chatbot victoria)🤖                                                  Aprovecha la promocion de $11,499 a  $6,999 solo por este mes                                                       si te interesa pideme que te contacte con un asesor para mas informacion. ",
    //             arrayOptions:["necesito una tienda virtual","tienda virtual","ecommerce","e-commerce","tienda online",5,"5","opcion 5","opsion 5",]
    //         },
    //         opcion6:{
    //             message:"Aprovecha la popularidad de los smartphones 📱 y ten tu propia app para acercarte a tus clientes y vender más  💹💸                                                                          El acceso a una aplicación móvil es inmediato, un único clic, no es necesario acceder a un navegador 🌐 e indicar o seleccionar una dirección de internet                                                                                      Una aplicación móvil 💎 incrementa la adopción de tu marca y te acerca a los clientes (¡te llevan en el bolsillo!)                                                                               No esperes mas evoluciona tu negocio si te interesa te puedo contactar con un asesor.",
    //             arrayOptions:["6",6,"opcion 6","opsion 6","necesito una aplicacion","aplicacion","app","applicacion","aplicasion"]
    //         },
    //             opcion8:{
    //             message:"Aprovecha la popularidad de los smartphones 📱 y ten tu propia app para acercarte a tus clientes y vender más  💹💸                                                                          El acceso a una aplicación móvil es inmediato, un único clic, no es necesario acceder a un navegador 🌐 e indicar o seleccionar una dirección de internet                                                                                      Una aplicación móvil 💎 incrementa la adopción de tu marca y te acerca a los clientes (¡te llevan en el bolsillo!)                                                                               No esperes mas evoluciona tu negocio si te interesa te puedo contactar con un asesor.",
    //             arrayOptions:["8",8,"opcion 8","opsion 8"]
    //         },
        
    //         opcionVictoria:{
    //             message:"Tener un asistente virtual las 24 horas 🏪 los 7 dias de las semana, para contestar todos tus mensajes y responder rapido a las dudas de tus clientes.                                                                                                     Ademas si en tu negocio agendas citas el CHATBOT puede no solo mantener una conversacion con una persona si no que tambien la inteligencia artificial puede agendar citas, ya que contamos con una aplicacion GRATUITA en la PlayStore para que asi puedes monitorear todos tus mensajes y tambien llevar el control de tus citas, todo esto y mas por un solo pago de $399 MXN.                                                                                                                       ¿ Te interesa una prueba ?                                                                                               Pideme ( contactar con un asesor ó opcion 7 ) y con gusto uno de nuestros asesores te agendara una prueba GRATIS y tambien te brindara mucha mas informacion acerca de mis servicios, no esperes mas e IMPULSA tu negocio a la era digital",
    //             arrayOptions:["paquete victoria","victoria","chatbot","24hrs","asistente","bot"]
    //         },
    //         paquetePerzonalizado:{
    //             message:"Sabemos que las necesidades de cada negocio son diferentes, es por eso que en IMPULSA nos adaptamos a las necesidades de tu negocio o empresa sin importar si es chico o grande, pideme que te contacte con algun asesor y con gusto te ayudaran a crear un paquete para tu negocio a la medida.",
    //             arrayOptions:["perzonalizado","ala medida","personalisado","personalizado","perzonalisado"]
    //         },
    //         paquetePremium:{
    //             message:"Excelente desicion, con el paquete PREMIUM 💎 contaras de mi asistencias las 24HRS 🏪, adicional tendras post semanales en tus redes sociales, acceso a una aplicacion movil con la cual podras contestar los mensajes de tus redes de negocio como tu pagina de facebook, y whatssapp todas en un mismo lugar, esto y muchas cosas mas por tan solo $1,999 al mes                                                                                    ¿ Te interesa ?                                                                                pideme que te contacte con un asesor para que te puedan dar mas informacion.",
    //             arrayOptions:["premi","paquete premiun","paquete premium","premium","paquekte premium","paqute dos","segundo paquete","premiun"]
    //         },
    //         paqueteBasico:{
    //             message:"Con el paquete basico podras gozar de acceso ala aplicacion, manejo de citas por medio de inteligencia artificial, chatbot perzonalizado a tu negocio, 2 publicaciones (con diseño incluido acorde a tu negocio) por semana, segmentacion de ununcio de alto impaco, dirigidos a tu publico objetivo, estadisticas mensuales desprecupate de tus redes y aumenta tus ventas por tan solo $ 799 MXN al mes.",
    //             arrayOptions:["paquete basico","basico","paquekte bascio","paqute uno","primer paquete"]
    //         },
    //         masInformacion:{
    //             massage:"Que informacion necesitas ?                                                                                                          Si necesitas de nuevo el menu de opciones pidemelo y con gusto te lo vuelvo a mandar                                                                                                               si necesitas hablar con un asesor, pideme (hablar con asesor) y con gusto uno de nuestros asesores te atendera ?",
    //             arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
    //         },
    //         interesOpcion1:{
    //             message:"Si tu negocio no está en internet 🌐   ¿Realmente existe?                                                                                               Si aun no cuentas con una pagina web, Nosotros ayudamos a crearla.                                                              Te interesa ? pideme que te contacte con un asesor para mas informacion",
    //             arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
    //         },
    //         interesOpcion2:{
    //             message:"Si necesitas mas informacion acerca de las estrategias de marketing digital, pideme que te contacte con algun asesor y con gusto el te atendera.",
    //             arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
    //         },
    //         sinOpcion:{
    //             message:"Te gustaria concer de nuevo las opciones del menu ( repetir menu ) o si necesitas que te contacte con un asesor pidemelo y con gusto lo hare."
    //         },
    //         interesCita:{
    //             message:"Con gusto puedo realizarte una cita estos son los días que tenemos disponibles",
    //             arrayOptions:["cita","sita","zita"]
    //         }

    //     }
    // }
    // const respuestas = new AnswersModel({idClientFacebook,answersSend})
    // await respuestas.save()



    //redeclaro para que se actualizce la variable y pregunte si esta activa citas por que se actuiva en la otra funcion pero la variable esta declarada con el false hasta que actualiza
existeUser = await chatBotModel.find({userFacebook:recipientId});

const clientMio = await userModel.find({idFacebook:idClientFacebook});

    
if(existeUser[0].interesCita){


    let arrayDays = validationsDay(clientMio)




    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesCita:false},{new:true});
    sendButtonMessage(
        recipientId,
        idClientFacebook,
        arrayDays[0],
        arrayDays[1],
        // dia3.format("dddd DD MMMM"),
        arrayDays[2],
    )

    sendMessageText(
        recipientId,
        "Si te interesa otro dia puedes pedirme que te contacte con mi dueño y el con gusto agendara para futuros dias"
        ,idClientFacebook
    );

    return

 }
    


    if(finalMessage !== null) sendMessageText(recipientId,finalMessage,idClientFacebook);
    // sendMessageImage(recipientId,idClientFacebook)


      
      
      




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




const sendMessageImage = (recipientId,idClientFacebook) =>{

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
    
        callSendApi(messageData,idClientFacebook);
    }
    




const sendButtonMessage = (recipientId,idClientFacebook,day1=".",day2=".",day3=".") => {
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
                      "title": "Selecciona la fecha que quieres tu cita.",
                      "buttons": [{
                        "type": "postback",
                        "payload": "true",
                        "title": `${day1}`
                      },{
                        "type": "postback",
                        "payload": "true",
                        "title": `${day2}`
                    },{
                        "type": "postback",
                        "payload": "true",
                        "title": `${day3}`
                    }
                ],
                  }]
              }
        }
      }
    };  
   
    callSendApi(messageData,idClientFacebook);
  }





// exports.sendButtonMessage = (recipientId,idClientFacebook,day1=".",day2=".",day3=".") => {
//     var messageData = {
//       recipient: {
//         id: recipientId
//       },
//       message: {
//         attachment: {
//           type: "template",
//           "payload": {
//                   "template_type": "generic",
//                   "elements": [{
//                       "title": "Selecciona la fecha que quieres tu cita.",
                      
//                       "buttons": [{
//                         "type": "postback",
//                         "payload": "true",
//                         "title": `${day1}`
//                       },{
//                         "type": "postback",
//                         "payload": "true",
//                         "title": `${day2}`
//                     },{
//                         "type": "postback",
//                         "payload": "true",
//                         "title": `${day3}`
//                     }
//                 ],
//                   }]
//               }
//         }
//       }
//     };  
   
//     callSendApi(messageData,idClientFacebook);
//   }



exports.sendMessageText = (recipientId,message,idFacebook) =>{
    let messageData = {
        recipient:{
            id:recipientId
        },
        message:{
            text: message
        }
    }
    
    callSendApi(messageData,idFacebook);

}



const oneButtonMessage = (recipientId,idClientFacebook,day,title="Hora disponible.") => {
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
                      "title": title,
                      "buttons": [{
                        "type": "postback",
                        "payload": "true",
                        "title": `${day}`
                      }
                ],
                  }]
              }
        }
      }
    };  
   
    callSendApi(messageData,idClientFacebook);
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
      element = element.toLocaleLowerCase()
      element = removeAccents(element)
      const econtro = sentece.indexOf(element) > -1;

      if(econtro){

        encontrado = true;
        return
      }
      

   });


return encontrado;
}















//  const answersSend = {
        
//         answersDefault : "Hola gracias por ponerte en contacto con LASH STUDIO, soy VICTORIA tu asistente virtual 🤖 un gusto saludarte en que te puedo ayudar :                                                          1. Informacion de nuestros servicios                                                                                            2. Donde estan ubicados                                                                                                          3. Fotos de tecnica clasica                                                                                                                                                                       4. Fotos tecnica hybrida                                                                                                                                                             5. fotos tecnica volumen                                                                                                                                                           6. Fotos tecnica mega volumen                                                                                                                                                                            7. Hablar con Estefania Aveytia",
//         SaludarNuevamente : "Hola de nuevo 👋 gracias por volverte a ponerte en contacto con LASH STUDIO, soy VICTORIA tu asistente virtual 🤖 un gusto volverte a saludar en que te puedo ayudar :                                                          1. Informacion de nuestros servicios                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico o por un solo pago $399 MXN ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                               ( PAQUETE VICTORIA ó CHATBOT ) 🤖💬",
//         answersArrays:{
//             opcionAsesor:{
//                 message:"Estoy contactando a uno de nuestros asesores 👨‍💼👩‍💼, para que pueda atender todas tus dudas en un momento te atenderan........",
//                 arrayOptions:["hablar con asesor","acesor","asesor","acecor","asesores","acesores","acecores",7,"siete","ciete","7","ultima opcion","opcion ultima","opcion 7","opsion 7","contactar asesor","contactar con asesor"]
//             },
//             opcionMenuPrincipal:{
//                 message:"1. Informacion de nuestros servicios                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico o por un solo pago $399 MXN ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                                                ( PAQUETE VICTORIA ó CHATBOT ) 🤖💬",
//                 arrayOptions: ["menu principal","menu de opciones","menu opciones","lista de opciones","lista opciones","menu"],
//             },
//             opcion1:{
//                 message:"📱¡Es el momento de que tu negocio este en las Redes!🚀                                                                          Creamos paginas web modernas, adaptables a cualquier dispositivo ya sea computadora, tableta o dispositivo movil.                                                                                                   No esperes mas es tiempo de IMPULSAR🚀 tu negocio a la era digital.                                                                                                          Quieres mas informacion ?",
//                 arrayOptions:["necesito una pagina web","pagina web","quiero una web","opcion 1","opsion 1",1,"paginas web","una web"]
//             },
//             opcion2:{
//                 message:"Quieres vender mas ? 💰💸💲                                                                                           Somos expertos en la creacion de campañas publicitarias de alto impacto, nos especializamos en el creciemiento 💹 de marcas  y productos  para acercarte a tus clientes potenciales.                                                                                  Quieres mas informacion, pideme contactarte con alguno de nuestros asesores 👨‍💻👩‍💻 para que IMPULSES 🚀 tu negocios hacia el futuro.",
//                 arrayOptions:["vender mas","incrementar mis ventas","subir ventas","vender online","ventas en linea","campanas de ventas","camapanas publicitarias","seo","camapanas marketing",2,"opcion 2","segunda opcion","opsion 2","2","ventas","tengo un negocio","negocio"]
//             },
//             opcion3:{
//                 message:"Sabemos que todos los negocios son diferentes, y que tienen distintas necesidades es por eso que contamos con 3 paquetes 📦 a la medida para ti:                                                                       PAQUETE BASICO 🏷,                                                                  PAQUETE PREMIUM 💎,                                                                          PAQUETE PERZONALIZADO 🆒,                                                             ¿Cuál paquete te interesa?                                                                                       Todos los paquetes vienen incluidos con el servicio del CHAT-BOT VICTORIA, nos adaptamos a cualquier tipo de negocio o necesidades.",
//                 arrayOptions:["paquetes","paquete",3,"3","opcion 3","opsion 3"]
//             },
//             opcion4:{
//                 message:"Este mes de septiembre tenemos los sitios web 🌐 básicos, adaptables a todo tipo de dispositivo ya sean tabletas, móviles 📱 o pc 💻, además hospedaje para tu pagina web y dominio por un año GRATIS por tan solo $ 2,999,  ¿te interesa? Dime ( contactar con un asesor ) para mas información. ",
//                 arrayOptions:["promo del mes","promocion mes","promosion del mes","promocion del mes","opcion 4",4,"4","promociones del mes","promosiones del","promociones"]
//             },
//             opcion5:{
//                 message:"➡Empieza a vender en Línea tus productos o servicios👏🏼😄📱 Diseñamos tu tienda virtual,  diseño de logotipo, incluye:                                                         hospedaje y cuentas de email,                                                                Asistente virtual las 24hrs en tu tienda virtual(Chatbot victoria)🤖                                                  Aprovecha la promocion de $11,499 a  $6,999 solo por este mes                                                       si te interesa pideme que te contacte con un asesor para mas informacion. ",
//                 arrayOptions:["necesito una tienda virtual","tienda virtual","ecommerce","e-commerce","tienda online",5,"5","opcion 5","opsion 5",]
//             },
//             opcion6:{
//                 message:"Aprovecha la popularidad de los smartphones 📱 y ten tu propia app para acercarte a tus clientes y vender más  💹💸                                                                          El acceso a una aplicación móvil es inmediato, un único clic, no es necesario acceder a un navegador 🌐 e indicar o seleccionar una dirección de internet                                                                                      Una aplicación móvil 💎 incrementa la adopción de tu marca y te acerca a los clientes (¡te llevan en el bolsillo!)                                                                               No esperes mas evoluciona tu negocio si te interesa te puedo contactar con un asesor.",
//                 arrayOptions:["6",6,"opcion 6","opsion 6","necesito una aplicacion","aplicacion","app","applicacion","aplicasion"]
//             },
//                 opcion8:{
//                 message:"Aprovecha la popularidad de los smartphones 📱 y ten tu propia app para acercarte a tus clientes y vender más  💹💸                                                                          El acceso a una aplicación móvil es inmediato, un único clic, no es necesario acceder a un navegador 🌐 e indicar o seleccionar una dirección de internet                                                                                      Una aplicación móvil 💎 incrementa la adopción de tu marca y te acerca a los clientes (¡te llevan en el bolsillo!)                                                                               No esperes mas evoluciona tu negocio si te interesa te puedo contactar con un asesor.",
//                 arrayOptions:["8",8,"opcion 8","opsion 8"]
//             },
        
//             opcionVictoria:{
//                 message:"Tener un asistente virtual las 24 horas 🏪 los 7 dias de las semana, para contestar todos tus mensajes y responder rapido a las dudas de tus clientes.                                                                                                     Ademas si en tu negocio agendas citas el CHATBOT puede no solo mantener una conversacion con una persona si no que tambien la inteligencia artificial puede agendar citas, ya que contamos con una aplicacion GRATUITA en la PlayStore para que asi puedes monitorear todos tus mensajes y tambien llevar el control de tus citas, todo esto y mas por un solo pago de $399 MXN.                                                                                                                       ¿ Te interesa una prueba ?                                                                                               Pideme ( contactar con un asesor ó opcion 7 ) y con gusto uno de nuestros asesores te agendara una prueba GRATIS y tambien te brindara mucha mas informacion acerca de mis servicios, no esperes mas e IMPULSA tu negocio a la era digital",
//                 arrayOptions:["paquete victoria","victoria","chatbot","24hrs","asistente"]
//             },
//             paquetePerzonalizado:{
//                 message:"Sabemos que las necesidades de cada negocio son diferentes, es por eso que en IMPULSA nos adaptamos a las necesidades de tu negocio o empresa sin importar si es chico o grande, pideme que te contacte con algun asesor y con gusto te ayudaran a crear un paquete para tu negocio a la medida.",
//                 arrayOptions:["perzonalizado","ala medida","personalisado","personalizado","perzonalisado"]
//             },
//             paquetePremium:{
//                 message:"Excelente desicion, con el paquete PREMIUM 💎 contaras de mi asistencias las 24HRS 🏪, adicional tendras post semanales en tus redes sociales, acceso a una aplicacion movil con la cual podras contestar los mensajes de tus redes de negocio como tu pagina de facebook, y whatssapp todas en un mismo lugar, esto y muchas cosas mas por tan solo $1,999 al mes                                                                                    ¿ Te interesa ?                                                                                pideme que te contacte con un asesor para que te puedan dar mas informacion.",
//                 arrayOptions:["premi","paquete premiun","paquete premium","premium","paquekte premium","paqute dos","segundo paquete","premiun"]
//             },
//             paqueteBasico:{
//                 message:"Con el paquete basico podras gozar de acceso ala aplicacion, manejo de citas por medio de inteligencia artificial, chatbot perzonalizado a tu negocio, 2 publicaciones (con diseño incluido acorde a tu negocio) por semana, segmentacion de ununcio de alto impaco, dirigidos a tu publico objetivo, estadisticas mensuales desprecupate de tus redes y aumenta tus ventas por tan solo $ 799 MXN al mes.",
//                 arrayOptions:["paquete basico","basico","paquekte bascio","paqute uno","primer paquete"]
//             },
//             masInformacion:{
//                 massage:"Que informacion necesitas ?                                                                                                          Si necesitas de nuevo el menu de opciones pidemelo y con gusto te lo vuelvo a mandar                                                                                                               si necesitas hablar con un asesor, pideme (hablar con asesor) y con gusto uno de nuestros asesores te atendera ?",
//                 arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
//             },
//             interesOpcion1:{
//                 message:"Si tu negocio no está en internet 🌐   ¿Realmente existe?                                                                                               Si aun no cuentas con una pagina web, Nosotros ayudamos a crearla.                                                              Te interesa ? pideme que te contacte con un asesor para mas informacion",
//                 arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
//             },
//             interesOpcion2:{
//                 message:"Si necesitas mas informacion acerca de las estrategias de marketing digital, pideme que te contacte con algun asesor y con gusto el te atendera.",
//                 arrayOptions:["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"]
//             },
//             sinOpcion:{
//                 message:"Te gustaria concer de nuevo las opciones del menu ( repetir menu ) o si necesitas que te contacte con un asesor pidemelo y con gusto lo hare."
//             },
//             interesCita:{
//                 message:"Con gusto puedo realizarte una cita estos son los días que tenemos disponibles",
//                 arrayOptions:["cita","sita","zita"]
//             }

//         }
//     }
//     const respuestas = new AnswersModel({idClientFacebook,answersSend})
//     await respuestas.save()
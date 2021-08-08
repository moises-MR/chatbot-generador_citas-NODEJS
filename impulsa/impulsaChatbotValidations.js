const chatBotModel = require("../models/ChatBotFace");
const venom = require('venom-bot');
require("dotenv").config({path:"variables.env"});








module.exports =  validationMessageImpulsa  = async  (message,id,existeUser) => {


    
    
    const messageWhats = {
        id: `false_521${process.env.NUMERO_ENVIO}@c.us_3AAAEE9E1C83F7561445`,
        body: 'Hola',
        type: 'chat',
        t: 1628117450,
        notifyName: '',
        from: `521${process.env.NUMERO_ENVIO}@c.us`,
        to: `521${process.env.NUMERO_SALIENTE}@c.us`,
        self: 'in',
        ack: 0,
        invis: false,
        isNewMsg: true,
        star: false,
        recvFresh: true,
        isFromTemplate: false,
        broadcast: false,
        mentionedJidList: [],
        isVcardOverMmsDocument: false,
        isForwarded: false,
        labels: [],
        productHeaderImageRejected: false,
        isDynamicReplyButtonsMsg: false,
        isMdHistoryMsg: false,
        chatId: `521${process.env.NUMERO_ENVIO}@c.us`,
        fromMe: false,
        sender: {
          id: `521${process.env.NUMERO_ENVIO}@c.us`,
          pushname: 'Impulsa',
          type: 'in',
          verifiedName: 'Impulsa',
          isBusiness: true,
          isEnterprise: false,
          verifiedLevel: 0,
          statusMute: false,
          labels: [],
          isMe: false,
          isMyContact: false,
          isPSA: false,
          isUser: true,
          isWAContact: true,
          profilePicThumbObj: { eurl: null, id: `521${process.env.NUMERO_ENVIO}@c.us`, tag: null },
          msgs: null
        },
        timestamp: 1628117450,
        content: 'Hola',
        isGroupMsg: false,
        isMedia: false,
        isNotification: false,
        isPSA: false,
        chat: {
          id: `521${process.env.NUMERO_ENVIO}@c.us`,
          pendingMsgs: false,
          lastReceivedKey: {
            fromMe: true,
            remote: `521${process.env.NUMERO_ENVIO}@c.us`,
            id: 'HD3MOSL3YJWXHJEQIBL0',
            _serialized: `true_521${process.env.NUMERO_ENVIO}_HD3MOSL3YJWXHJEQIBL0`
          },
          t: 1628116862,
          unreadCount: 0,
          archive: false,
          isReadOnly: false,
          modifyTag: 637495,
          muteExpiration: 0,
          notSpam: true,
          pin: 0,
          ephemeralDuration: 0,
          ephemeralSettingTimestamp: 0,
          msgs: null,
          kind: 'chat',
          isGroup: false,
          contact: {
            id: '5213330172717@c.us',
            pushname: 'Impulsa',
            type: 'in',
            verifiedName: 'Impulsa',
            isBusiness: true,
            isEnterprise: false,
            verifiedLevel: 0,
            statusMute: false,
            labels: [],
            formattedName: '+52 1 33 3017 2717',
            isMe: false,
            isMyContact: false,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: [Object],
            msgs: null
          },
          groupMetadata: null,
          presence: { id: '5213330172717@c.us', chatstates: [] },
          isOnline: true,
          lastSeen: null
        },
        isOnline: true,
        lastSeen: null,
        quotedMsgObj: null,
        mediaData: {}
      }
     
   
// Funcion para enviar un mensaje
const enviarSms = async (client,message) => {
    try {
      await client.sendText(message.from, 'Tienes un CLIENTE que esta interesado en tus servicios ATIENDELO ALA BREVEDAD !!')
        
    } catch (error) {
   console.error('Hubo un ERROR: ', error); //return object error
        
    }

};












    let finalMessage = "";
    const hablarConAcesor = ["hablar con asesor","acesor","asesor","acecor","asesores","acesores","acecores",7,"siete","ciete","7","ultima opcion","opcion ultima","opcion 7","opsion 7","contactar asesor","contactar con asesor"]
    const opcionPaginaWeb = ["necesito una pagina web","pagina web","quiero una web","opcion 1","opsion 1",1,"paginas web","una web"];
    const opcionQuieroVenderMas = ["vender mas","incrementar mis ventas","subir ventas","vender online","ventas en linea","campanas de ventas","camapanas publicitarias","seo","camapanas marketing",2,"opcion 2","segunda opcion","opsion 2","2","ventas","tengo un negocio","negocio"];
    const opcionPaquetes = ["paquetes","paquete",3,"3","opcion 3","opsion 3"];
    const opcionPromoMes = ["promo del mes","promocion mes","promosion del mes","promocion del mes","opcion 4",4,"4","promociones del mes","promosiones del","promociones"];
    const opcionTiendaVirtual = ["necesito una tienda virtual","tienda virtual","ecommerce","e-commerce","tienda online",5,"5","opcion 5","opsion 5",];
    const opcionAPP = ["6",6,"opcion 6","opsion 6","necesito una aplicacion","aplicacion","app","applicacion","aplicasion"]
    const paqueteBasico = ["paquete basico","basico","paquekte bascio","paqute uno","primer paquete"];
    const paquetePremium = ["premi","paquete premiun","paquete premium","premium","paquekte premium","paqute dos","segundo paquete","premiun"];
    const paquetePerzonalizado = ["perzonalizado","ala medida","personalisado","personalizado","perzonalisado"];
    const masInformacion = ["informacion","mas informacion","necesito informacion","nececito info","quiero info","necesito info","mas info","requiero info","requiero informacion","requiero mas informacion","requiero mas info","quiero","mas"];
    const menuPrincipal = ["menu principal","menu de opciones","menu opciones","lista de opciones","lista opciones","menu"];
    const paqueteVICTORIA = ["paquete victoria","victoria","chatbot","24hrs","asistente"];


    // const existeUser = await consulatApi(id);
    

    if(existeUser.length === 0){
        // Primera vez que habla al chat
        finalMessage = "Hola gracias por ponerte en contacto con IMPULSA 🚀, soy VICTORIA tu asistente virtual 🤖 un gusto saludarte en que te puedo ayudar :                                                          1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                                  PAQUETE VICTORIA 🤖💬";    

    }else{





            // Ya existe conversacion con el usuario
            //Validamos si no existe el primer saludo del dia y si no existe lo hacemos y actualizamo primer saludo a true
            if(!existeUser[0]?.primerSaludo){
          
            await chatBotModel.updateOne({_id:existeUser[0]?._id},{primerSaludo:true},{new:true});
            finalMessage = "Hola de nuevo 👋 gracias  volverte a ponerte en contacto con IMPULSA 🚀, soy VICTORIA tu asistente virtual 🤖 un gusto volverte a saludar en que te puedo ayudar :                                                          1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                               PAQUETE VICTORIA 🤖💬";    

            }else{
   
            

            //Hacemos validaciones de las opciones que se le dieron primero validando si quiere hablar con asesor
            if(isCotaint(message,hablarConAcesor)){
                //Ya existe el primer saludo del dia
            venom.create()
            .then((client) => {enviarSms(client,messageWhats)})
            .catch((erro) => {
                console.log(erro);
            });
                //Si quiere hablar con un asesor
                await chatBotModel.updateOne({_id:existeUser[0]?._id},{hablarAsesor:true},{new:true})
                return  finalMessage = "Estoy contactando a uno de nuestros asesores 👨‍💼👩‍💼, para que pueda atender todas tus dudas en un momento te atenderan........"
            }


            // Quiere de nuevo el menu de opciones
            if(isCotaint(message,menuPrincipal)){
             return finalMessage = "1. Necesito una pagina web  🌐                                                                                            2. Tengo un negocio y quiero crecer mis ventas 👨‍💼💰📈                                                                                                        3. Quiero conocer los paquetes 📦🎁                                                                                                                                                                       4. Promociones del mes 🏷🔥                                                                                                                                                             5. Necesito una tienda online 🏪🛍️                                                                                                                                                              6. Necesito una aplicacion movil 📱                                                                                                                                                                            7. Hablar con un asesor 👨🏼‍💻📲                                                                                                                                                           Sabias que desde el paquete mas basico ya cuentas con mis servicios.                                                                                                                                                                            Para mas informacion pide,                                                                                PAQUETE VICTORIA 🤖💬";    

            }


            

            

            //Validando la opcion de la pagina web si es que quiere algo reliazionado
            if(isCotaint(message,opcionPaginaWeb)){
            //Primer mensaje de las opciones WEB
            await chatBotModel.updateOne({_id:existeUser[0]._id},{interesWeb:true,masInformacion:true},{new:true});
             return finalMessage = "📱¡Es el momento de que tu negocio este en las Redes!🚀                                                                          Creamos paginas web modernas, adaptables a cualquier dispositivo ya sea computadora, tableta o dispositivo movil.                                                                                                   No esperes mas es tiempo de IMPULSAR🚀 tu negocio a la era digital.                                                                                                          Quieres mas informacion ?"
            }
            



                // Opcion vender mas tengo negocio
                if(isCotaint(message,opcionQuieroVenderMas)){
                    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesCrecerNegocio:true,masInformacion:true},{new:true});
                    return finalMessage = "Quieres vender mas ? 💰💸💲                                                                                           Somos expertos en la creacion de campañas publicitarias de alto impacto, nos especializamos en el creciemiento 💹 de marcas  y productos  para acercarte a tus clientes potenciales.                                                                                  Quieres mas informacion, pideme contactarte con alguno de nuestros asesores 👨‍💻👩‍💻 para que IMPULSES 🚀 tu negocios hacia el futuro."       

                }

               

                //Opcion promocion del mes
                if(isCotaint(message,opcionPromoMes)){

                    return finalMessage = "Este mes de agosto tenemos los sitios web 🌐 básicos, adaptables a todo tipo de dispositivo ya sean tabletas, móviles 📱 o pc 💻, además hospedaje para tu pagina web y dominio por un año GRATIS por tan solo $ 2,999,  ¿te interesa? Pídeme que te contacte con un asesor para mas información. "
                }







                //Opcion necesito una APP
                if(isCotaint(message,opcionAPP)){
                        await chatBotModel.updateOne({_id:existeUser[0]?._id},{interesApp:true},{new:true});
                        return finalMessage = "Aprovecha la popularidad de los smartphones 📱 y ten tu propia app para acercarte a tus clientes y vender más  💹💸                                                                          El acceso a una aplicación móvil es inmediato, un único clic, no es necesario acceder a un navegador 🌐 e indicar o seleccionar una dirección de internet                                                                                      Una aplicación móvil 💎 incrementa la adopción de tu marca y te acerca a los clientes (¡te llevan en el bolsillo!)                                                                               No esperes mas evoluciona tu negocio si te interesa te puedo contactar con un asesor."
                }




               

                //Opciones mas informacion quiere informacion desde la primera lista sin seleccionar nada mas
                if(existeUser[0]?.masInformacion === false && isCotaint(message,masInformacion)){

                    

                    return  finalMessage = "Que informacion necesitas ?                                                                                                          Si necesitas de nuevo el menu de opciones pidemelo y con gusto te lo vuelvo a mandar                                                                                                               Quieres hablar con algun asesor ?";

                }



                 


           
                //PAQUETES
                if(existeUser[0]?.interesPaquetes && existeUser[0].masInformacion){
                
                     //informacion de paquetes basico
                     if(isCotaint(message,paqueteBasico)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesPaquetes:false},{new:true});
                        return  finalMessage = "Muy buena desicion, con el paquete BASICO contaras de mi asistencias las 24HRS 🏪, post semanales y mucho mas por tan solo $999 al mes.                                                                                                       ¿ Te interesa ?                                                                                pideme que te contacte con un asesor para que te puedan dar mas informacion.";
                     }


                     //informacion de paquetes premiun
                    if(isCotaint(message,paquetePremium)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesPaquetes:false},{new:true});
                        return  finalMessage = "Excelente desicion, con el paquete PREMIUM 💎 contaras de mi asistencias las 24HRS 🏪, adicional tendras post semanales en tus redes sociales, acceso a una aplicacion movil con la cual podras contestar los mensajes de tus redes de negocio como tu pagina de facebook, y whatssapp todas en un mismo lugar, esto y muchas cosas mas por tan solo $2,599 al mes                                                                                    ¿ Te interesa ?                                                                                pideme que te contacte con un asesor para que te puedan dar mas informacion.";
                     }



                      //informacion de paquetes perzonalizado
                    if(isCotaint(message,paquetePerzonalizado)){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesPaquetes:false},{new:true});
                        return  finalMessage = "Sabemos que las necesidades de cada negocio son diferentes, es por eso que en IMPULSA nos adaptamos a las necesidades de tu negocio o empresa sin importar si es chico o grande, pideme que te contacte con algun asesor y con gusto te ayudaran a crear un paquete para tu negocio a la medida.";
                     }

                     if(isCotaint(message,paqueteVICTORIA)){

                        return finalMessage = "Tener un asistente virtual las 24 horas 🏪 los 7 dias de las semana, para contestar todos tus mensajes y responder rapido a las dudas de tus clientes.                                                                                                     No esperes mas adquiere cualquiera de nuestros paquetes y permite una mejor experiencia al usuario en tu negocio."
                    }

                }



                if(isCotaint(message,paqueteVICTORIA)){

                    return finalMessage = "Tener un asistente virtual las 24 horas 🏪 los 7 dias de las semana, para contestar todos tus mensajes y responder rapido a las dudas de tus clientes.                                                                                                     No esperes mas adquiere cualquiera de nuestros paquetes y permite una mejor experiencia al usuario en tu negocio."
                }


                // Quiero conocer paquetes  ** este va abajo por que necesita validar si ya pidio informes del paquete y necesita un paquete de otra manera entra aqui perimero y no muestra el paquete
                if(isCotaint(message,opcionPaquetes)){
                    await chatBotModel.updateOne({_id:existeUser[0]._id},{interesPaquetes:true,masInformacion:true},{new:true});
                    return finalMessage = "Sabemos que todos los negocios son diferentes, y que tienen distintas necesidades es por eso que contamos con 3 paquetes 📦 a la medida para ti:                                                                       PAQUETE BASICO 🏷,                                                                  PAQUETE PREMIUM 💎,                                                                          PAQUETE PERZONALIZADO 🆒,                                                             ¿Cuál paquete te interesa?                                                                                       Todos los paquetes vienen incluidos con el servicio del CHAT-BOT VICTORIA, nos adaptamos a cualquier tipo de negocio o necesidades."       
 
                }

              

                    //Validar si quiere la opcion de ecommerce
                if(isCotaint(message,opcionTiendaVirtual)){

                    return finalMessage =  "➡Empieza a vender en Línea tus productos o servicios👏🏼😄📱 Diseñamos tu tienda virtual,  diseño de logotipo, incluye:                                                         hospedaje y cuentas de email,                                                                Asistente virtual las 24hrs en tu tienda virtual(Chatbot victoria)🤖                                                  Aprovecha la promocion de $11,499 a  $6,999 solo por este mes                                                       si te interesa pideme que te contacte con un asesor para mas informacion. "

                }



                  






                //Quiere informacion pero ya tiene activo el mas info 
                if(existeUser[0]?.masInformacion && isCotaint(message,masInformacion) ){


                        //Validando que tipo de informacion quiere



                        //informacion de sitios WEB
                        if(existeUser[0]?.interesWeb){
                        await chatBotModel.updateOne({_id:existeUser[0]._id},{interesWeb:false},{new:true});
                         return  finalMessage = "Si tu negocio no está en internet 🌐   ¿Realmente existe?                                                                                               Si aun no cuentas con una pagina web, Nosotros ayudamos a crearla.                                                              Te interesa ? pideme que te contacte con un asesor para mas informacion";
                        }


                        //informacion de crecer negocio
                        if(existeUser[0]?.interesCrecerNegocio){
                            await chatBotModel.updateOne({_id:existeUser[0]._id},{interesCrecerNegocio:false},{new:true});
                            return  finalMessage = "Si necesitas mas informacion acerca de las estrategias de marketing digital, pideme que te contacte con algun asesor y con gusto el te atendera.";
                         }
  
                }



















                //No entendi nada de lo que me dijo
                finalMessage = "Te gustaria concer de nuevo las opciones del menu ( repetir menu ) o si necesitas que te contacte con un asesor pidemelo y con gusto lo hare."

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
    sentece = sentece.toLocaleLowerCase();
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


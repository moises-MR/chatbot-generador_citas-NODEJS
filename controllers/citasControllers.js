const chatBotModel = require("../models/ChatBotFace");
const userModel = require("../models/userModel");
const CitasModel = require("../models/CitasModel");



exports.getCitas = async (req,res)=> {
    
    const userId = req?.params;
    
    const user = await CitasModel.find({userId:userId.id});

    if(user){
        res.json(user)
    }else{
        res.json({res:"no esta"})
    }
    
}


exports.daysAndHours = async (req,res)=> {

    const {_id,daysAndHours,service} = req.body;
    
    try {
     
        const user = await userModel.find({_id});

       if(user[0]?.realizaCitas){
        await  userModel.updateOne({_id},{daysAndHours,realizaCitas:false},{new:true});
           res.json({message:"se a desativado"})
           return null
       }

       if(!user[0]?.realizaCitas){
        await  userModel.updateOne({_id},{daysAndHours,service,realizaCitas:true},{new:true});
        res.json({message:"se guardaron tus horarios"})
           return null
       }
       
     
    } catch (error) {
        console.log(error)
    }
  
}


exports.getOnlyAppoiment = async (req,res) => {

    const {id} = req.params;

    try {
    const appoiment = await CitasModel.find({_id:id});
    res.json(appoiment)    
    } catch (error) {
        console.log(error)
    }
}






exports.postCitas = async (req,res)=> {

    const {citas,userFacebook} = req.body;
    
    try {
        await  chatBotModel.updateOne({userFacebook},{citas},{new:true});
        res.json({message:"La cita se creo"})
    } catch (error) {
        console.log(error)
    }
  
}


exports.putCita = async (req,res)=> {

     const {id,appoiment} = req.body;
        const {idCita,idFaceook,servicio,horaCita,fechaCita,phone,name,complete} = appoiment;
    try {   
         await  CitasModel.updateOne({_id:id},{service:servicio,horaCita,fechaCita,phone,name,complete},{new:true});
        res.json({message:"Se actualizo la cita",status:200})
    } catch (error) {
        console.log(error)
    }
  
}



exports.postCompleteCita = async (req,res)=> {

    const {id,complete} = req.body;
    
   try {   
        await  CitasModel.updateOne({_id:id},{complete},{new:true});
       res.json({message:"Se actualizo la cita",status:200})
   } catch (error) {
       console.log(error)
   }
 
}


exports.deleteAppoiment = async (req,res)=> {

    const {id} = req.params;
  
   try {   
        await  CitasModel.deleteOne({_id:id});
       res.json({message:"Se elimino la cita",status:200})
   } catch (error) {
       console.log(error)
   }
 
}


exports.createAppoiment = async (req,res) => {


    try {
        
    const newAppoiment = new CitasModel(req.body);
   const response = await newAppoiment.save()
   if(response){
    res.sendStatus(200)

   }else{
    res.sendStatus(400)
   }
    } catch (error) {
        console.log(error)
    }

}
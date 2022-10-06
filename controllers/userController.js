
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs")









exports.imageProfileUpLoad = async (req,res,next) => {
    const { headers } = req

    let update = ""

       fs.renameSync(req?.file?.path,req?.file?.path + "." + req?.file?.mimetype.split("/")[1])
    try {
      const nameImage = req?.file.filename + "." + req?.file?.mimetype.split("/")[1]

     if(headers?.for === "WhatsApp"){
        update =   await  UserModel.updateOne({_id:headers?.userid},{imageBackgroundWhats:nameImage},{new:true});
     }else{

        update =   await  UserModel.updateOne({_id:headers?.userid},{imageProfile:nameImage},{new:true});
     }
  if(update){
    res.json({status:200})
 
  }else{
    res.json({status:401})

  }
    } catch (error) {
       console.log(error) 
    }
  }
  




exports.createUser = async (req,res) => {

    const user = new UserModel(req.body);
    user.password = await bcrypt.hash(req.body.password,12);

    try {
    
    await user.save();
    res.json({message:"user created"})
    
    } catch (error) {
        res.json({message:"HUBO UN ERROR EN CREATEUSERCONTROLLER"})
      console.log(error)  
    }
        

}

exports.login = async (req,res,next) => {

const { email, password } = req.body;


    try {
       const user = await UserModel.findOne({email});
         
       if(!user){
           await res.status(401).json({message:"User not exist",status:401});
           next();
       }else{

        if(!bcrypt.compareSync(password,user.password)){

            await res.status(401).json({message:"Icorrect password",status:401});

        }else{

            const token = jwt.sign({
                _id: user._id,
    
      
            },"KEYSECRET")
   
            res.json({token,status:200});
        }

       }


    } catch (error) {
        console.log(error)
    }
    
}



exports.getUser = async (req,res) => {
    const _id = req.params.id;
   
    try {  
    const user = await UserModel.findOne({_id});
    res.json(user);
    } catch (error) {
        console.log(error)
    }

}


exports.upDateUserName = async (req,res) => {

    const { id, dato } = req.body;
    try {
      await UserModel.updateOne({_id:id},{name:dato},{new:true})
    res.json({message:"Actualizado"})
    } catch (error) {
        console.log(error)
    }
}


exports.upDateUserEmail = async (req,res) => {

    const { id, dato } = req.body;
    try {
      await UserModel.updateOne({_id:id},{email:dato},{new:true})
    res.json({message:"Actualizado"})
    } catch (error) {
        console.log(error)
    }
}


exports.upDateUserPassword = async (req,res) => {

    let { id, dato } = req.body;
    dato = await bcrypt.hash(dato,12);
    try {
      await UserModel.updateOne({_id:id},{password:dato},{new:true})
    res.json({message:"Actualizado"})
    } catch (error) {
        console.log(error)
    }
}




exports.chatUpdate = async (req,res) => {

    let { id, dato } = req.body;
    try {
      await UserModel.updateOne({_id:id},{chatbotActive:dato},{new:true})
    res.json({message:"Actualizado"})
    } catch (error) {
        console.log(error)
    }
}
const express = require("express");
const router = express.Router();
const webHookController = require("../controllers/webhooksController");
const citasCotroller = require("../controllers/citasControllers");
const chatsController = require("../controllers/chatsFront");
const userController = require("../controllers/userController");
const answaresController = require("../controllers/answaresController");
const authJWT = require("../middleware/authJWT")
const multer = require("multer");
const upload = multer({dest:"uploads"})
const settingController = require("../controllers/settingsController")
 
module.exports = () => {

    router.get("/webhook",webHookController.getWebHook);
    router.post("/webhook",webHookController.postWebHook);
    router.get("/chats/:id",
    authJWT,
    chatsController.getChat);
    router.get("/chat/:id",
    authJWT,
    chatsController.getOneChat);
    router.post("/chat/:id",
    authJWT,
    chatsController.sendAndUpdateMsssage);
    router.post("/citas",
    authJWT,
    citasCotroller.postCitas);
    router.get("/citas/:id",
    authJWT,
    citasCotroller.getCitas);
    router.get("/citasOnly/:id",
    authJWT,
    citasCotroller.getOnlyAppoiment);
    router.put("/citasOnly/:id",
    authJWT,
    citasCotroller.putCita);
    router.post("/citasOnly/:id",
    authJWT,
    citasCotroller.postCompleteCita);
    router.delete("/citasOnly/:id",
    authJWT,
    citasCotroller.deleteAppoiment);
    router.post("/create-user",userController.createUser);
    router.post("/login",userController.login);
    router.get("/user/:id",
    authJWT,
    userController.getUser);
    router.put("/userName/:id",
    authJWT,
    userController.upDateUserName);
    router.put("/userEmail/:id",
    authJWT,
    userController.upDateUserEmail);
    router.put("/userPassword/:id",
    authJWT,
    userController.upDateUserPassword);
    router.post("/answares",answaresController.answaresCreate);
    //Falta JWT por error en front
    router.post("/newcita/:id",

    citasCotroller.daysAndHours);
    
    router.post("/create-appoiment",
    authJWT,
    citasCotroller.createAppoiment);
    router.put("/chatbot/:id",
    authJWT,
    userController.chatUpdate);
    router.post("/image-profile",
    authJWT,
    upload.single("imgProfile"),
    userController.imageProfileUpLoad)
    router.get("/admin/settings/image",settingController.imageBannerGet)
    router.put("/admin/settings/image",settingController.imageBannerPut)

    return router;
}
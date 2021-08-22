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
    router.get("/chat/:id",chatsController.getOneChat);
    router.post("/chat/:id",chatsController.sendAndUpdateMsssage);
    router.post("/citas",citasCotroller.postCitas);
    router.get("/citas/:id",citasCotroller.getCitas);
    router.get("/citasOnly/:id",citasCotroller.getOnlyAppoiment);
    router.put("/citasOnly/:id",citasCotroller.putCita);
    router.post("/citasOnly/:id",citasCotroller.postCompleteCita);
    router.delete("/citasOnly/:id",citasCotroller.deleteAppoiment);
    router.post("/create-user",userController.createUser);
    router.post("/login",userController.login);
    router.get("/user/:id",userController.getUser);
    router.put("/userName/:id",userController.upDateUserName);
    router.put("/userEmail/:id",userController.upDateUserEmail);
    router.put("/userPassword/:id",userController.upDateUserPassword);
    router.post("/answares",answaresController.answaresCreate);
    router.post("/newcita/:id",citasCotroller.daysAndHours);
    router.put("/chatbot/:id",userController.chatUpdate);
    router.post("/image-profile",
    upload.single("imgProfile"),
    userController.imageProfileUpLoad)
    router.get("/admin/settings/image",settingController.imageBannerGet)
    router.put("/admin/settings/image",settingController.imageBannerPut)

    return router;
}
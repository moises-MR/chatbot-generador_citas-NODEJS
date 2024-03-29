const jwt = require('jsonwebtoken');


module.exports = (req,res,next) =>{


    // autorizacion por el header
    const authHeader = req.get("Authorization");
    // console.log(authHeader);
    if(!authHeader){
        const error = new Error("Not Authorizated");
        error.statusCode = 401;
        throw error;
    }



    // Obtener el token y verificarlo
    const token = authHeader.split(" ")[1];
    let revisarToken;
    try {
        revisarToken = jwt.verify(token,"KEYSECRET");
    } catch (error) {
        error.statusCode = 500
        throw error;
    }


    // Si el token es valido pero ya expiro o ocurrio algun problema

    if(!revisarToken){
         const error = new Error("No autenticado");
         error.statusCode = 401;
         throw error;

    }

    next();

};
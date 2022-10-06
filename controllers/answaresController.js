const answersMondel = require("../models/AnswersModel");


exports.answaresCreate = async (req,res) => {

    const respuestas = req.body;

    try {
        const asnwares = new answersMondel(respuestas);
        asnwares.save();
        res.json(asnwares);

    } catch (error) {
        console.log(error)
    }
}
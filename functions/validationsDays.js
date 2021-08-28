const moment = require("moment");
moment.locale("es");



module.exports =  validationsDay =  (daysAndHours) => {


    let arrayDays = []
   
    const dia2 = moment().add(1,"days")
    const dia3 = moment().add(2,"days")
    const dia4 = moment().add(3,"days")
    const dia5 = moment().add(4,"days")
    const dia6 = moment().add(5,"days")
    const dia7 = moment().add(6,"days")
    const dia8 = moment().add(7,"days")
    const dia9 = moment().add(8,"days")
    const dia10 = moment().add(9,"days")
    const dia11 = moment().add(10,"days")
    const dia12 = moment().add(11,"days")
    const dia13 = moment().add(12,"days")
    const dia14 = moment().add(13,"days")
    const dia15 = moment().add(14,"days")

   

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }


    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }

    if(dia2.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia2.format("dddd DD MMMM"))
        }
    }




    //2

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }

 

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){

            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }


    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }

    if(dia3.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia3.format("dddd DD MMMM"))
        }
    }




        //3

        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }
    
        if(dia4.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia4.format("dddd DD MMMM"))
            }
        }


        //

        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
        console.log(daysAndHours[0]?.daysAndHours?.viernesDay?.name)
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            console.log("aqi")
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
    
        if(dia5.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia5.format("dddd DD MMMM"))
            }
        }
        



        //4
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    
        if(dia6.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia6.format("dddd DD MMMM"))
            }
        }
    


        //

        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }
    
        if(dia7.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia7.format("dddd DD MMMM"))
            }
        }



        //
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
            
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
        if(dia8.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia8.format("dddd DD MMMM"))
            }
        }
    
    

        // 

        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
            
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    
        if(dia9.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia9.format("dddd DD MMMM"))
            }
        }
    

        //


        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
            
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
            if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        if(dia10.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
            if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
                arrayDays.push(dia10.format("dddd DD MMMM"))
            }
        }
    
        //


         if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }

    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }

    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }

    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }


    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }

    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }

    if(dia11.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia11.format("dddd DD MMMM"))
        }
    }


    //////


    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }

    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }

    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }

    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }


    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }

    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }

    if(dia12.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia12.format("dddd DD MMMM"))
        }
    }


    ////

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }


    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }

    if(dia13.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia13.format("dddd DD MMMM"))
        }
    }



    //////


    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }

    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }

    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }

    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }


    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }

    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }

    if(dia14.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia14.format("dddd DD MMMM"))
        }
    }


    //////


    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.lunesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.lunesDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }

    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.martesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.martesDay.trabaja){
        
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }

    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.miercolesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.miercolesDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }

    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.juevesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.juevesDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }


    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.viernesDay?.name ){
        if(daysAndHours[0]?.daysAndHours.viernesDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }

    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.sabadoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.sabadoDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }

    if(dia15.format("dddd") === daysAndHours[0]?.daysAndHours?.domingoDay?.name ){
        if(daysAndHours[0]?.daysAndHours.domingoDay.trabaja){
            arrayDays.push(dia15.format("dddd DD MMMM"))
        }
    }




    return arrayDays;

}
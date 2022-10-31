var UserService = require('../services/user.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getUsers = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Users = await UserService.getUsers({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// Async Controller function to get the To do List
exports.getCategorias = async function (req, res, next) {
    console.log("MNMNJNJ")
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Categorias = await UserService.getCategorias({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Categorias, message: "Succesfully Categorias Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// TEAVISO Async Controller function to get the To do List
exports.getCategoriasByEmail = async function (req, res, next) {
    //console.log("YYYYYYYYYYYYYYYYY: ", req.query)
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1;
    var limit = req.query.limit ? req.query.limit : 10;
    var emailReq = req.query.email;
    try {
        var Categorias = await UserService.getCategoriasByEmail({email: emailReq}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Categorias, message: "Succesfully Categorias Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// TEAVISO Async Controller function to get the To do List
exports.searchFrasePictograma = async function (req, res, next) {
    try {
        
        var searchFrasePictograma = await UserService.searchFrasePictograma(req.query)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(201).json({status: 200, data: searchFrasePictograma, message: "Succesfully Frase Pictogramas"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// TEAVISO Async Controller function to get the To do List
exports.saveMessajeInCategoria = async function (req, res, next) {
    
    try {
        var saveFrasePictograma = await UserService.saveMessajeInCategoria(req.query)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(201).json({status: 200, data: saveFrasePictograma, message: "Succesfully Frase Pictogramas"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

// exports.createUser = async function (req, res, next) {
//     // Req.Body contains the form submit values.
//     var User = {
//         email: req.body.email,
//         password: req.body.password,
//         nombre: req.body.nombre,
//         apellido: req.body.apellido
//     }
//     try {
//         var createdUser = await UserService.createUser(User)
//         return res.status(201).json({user: createdUser, message: "Succesfully Created User"})
//     } catch (e) {
//         if(e.message == "01") {
//             return res.status(400).json({status: 400, message: "User already exists", code: "01"})    
//         }
//         //Return an Error Response Message with Code and the Error Message.
//         console.log(e)
//         return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
//     }
// }


// exports.loginUser = async function (req, res, next) {
//     // Req.Body contains the form submit values.
//     var User = {
//         email: req.body.email,
//         password: req.body.password
//     }
//     try {
//         var loginUser = await UserService.loginUser(User);
//         return res.status(201).json({user: loginUser, message: "Succesfully login"})
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         return res.status(400).json({status: 400, message: "Invalid username or password"})
//     }
// }
    
    
// exports.guardarBackup = async function (req, res, next) {
//     console.log(req.body);
//     // Req.Body contains the form submit values.
//     var Backup = {
//         email: req.body.email,
//         egresos: req.body.egresos,
//         cuentas: req.body.cuentas,
//         ingresos: req.body.ingresos,
//         prestamos: req.body.prestamos,
//         presupuestos: req.body.presupuestos,
//         inversiones: req.body.inversiones,
//         tarjetas: req.body.tarjetas,
//         resumenes: req.body.resumenes
//     }
//     try {
//         var resultado = await UserService.guardarBackup(Backup);
//         return res.status(201).json({backup: resultado, message: "Succesfully backup save"})
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         return res.status(400).json({status: 400, message: "Error"})
//     }
// }

// exports.recuperarBackup = async function (req, res, next) {
//     // Req.Body contains the form submit values.
//     var Backup = {
//         email: req.body.email
//     }
//     try {
//         var resultado = await UserService.recuperarBackup(Backup);
//         return res.status(200).json({backup: resultado, message: "Succesfully restore backup"})
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         return res.status(400).json({status: 400, message: "Error"})
//     }
// }

// exports.enviarMail = async function (req, res, next) {
//     // Req.Body contains the form submit values.
//     var User = {
//         email: req.body.email,
//         egresos: req.body.egresos,
//         tarjetas: req.body.tarjetas,
//         cuentas: req.body.cuentas,
//         ingresos: req.body.ingresos,
//         prestamos: req.body.prestamos,
//         inversiones: req.body.inversiones,
//         resumenes: req.body.resumenes
//     }
//     try {
//         var resultado = await UserService.enviarMail(User);
//         return res.status(200).json({resultado: '', message: "Mail enviado"})
//     } catch (e) {
//         //Return an Error Response Message with Code and the Error Message.
//         console.log(e);
//         return res.status(400).json({status: 400, message: "Error"})
//     }
// }

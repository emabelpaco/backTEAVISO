// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/usuario.model');
var Backup = require('../models/categoria.model');
var Categoria = require('../models/categoria.model');
var Mensaje = require('../models/mensaje.model');
var bcrypt = require('bcryptjs');
var fetch = require ('node-fetch');

var json2xls = require('json2xls');
var fs = require('fs');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        var Users = await User.paginate(query, options)
        console.log(User.collection);
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Paginating Users');
    }
}

// TEAVISO Async function busqueda de frases en pictogramas
exports.searchFrasePictograma = async function (query) {
    const https = require("https");
    const agent = new https.Agent({
        rejectUnauthorized: false
    })
    const url = 'https://sesat.fdi.ucm.es/serviciopictar/';
    const endpoint = `${url}${query.mensaje}`;
    console.log("$$$$$$$$$$$$$ ", endpoint)
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' },
        agent: agent
    };
    try {
        var respBusqueda = await fetch(endpoint, requestOptions)
        return respBusqueda.json()
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Paginating Categorias');
    }
    
}

// TEAVISO Async function guardado de frases en pictogramas
exports.saveMessajeInCategoria = async function (query) {
    console.log("QUERYYYYYYYYYYYYY: ", query)
    // // Verifico si ya existe
    // var _details = await Categoria.findOne({
    //     email: query.email
    // });
    // if (!_details) throw Error("01");
    // if (_details) console.log("BUSQUEDA XXXXXXXXX::: ", _details)
    const filter = { email: query.email };
    const options = { upsert: true };
   
    const updateDoc = {
        //$addToSet
        $set: {
            categorias: query.categorias
        },
    };
    var savedMensaje = await Categoria.findOneAndUpdate(filter, updateDoc, options);
    console.log("res: ", savedMensaje)

    var _details = await Categoria.findOne({
        email: query.email
    });
    if (!_details) throw Error("01");
    if (_details) console.log("BUSQUEDA XXXXXXXXX::: ", _details)
    var arrayMsg = query.categorias[query.idCategoria].mensajes[query.idMensaje].imagenes
    var arrayCateg = _details.categorias[query.idCategoria].mensajes[query.idMensaje].imagenes
    var indx = 0;
    var body = {};
    var arrayImagenes = [];
    console.log("ARRAY MSG:     ", arrayMsg)
    console.log("ARRAY CATEG:     ", arrayCateg)
    arrayCateg.forEach(element => {
        body["_id"] = element._id
        body["image"] = arrayMsg[indx].image
        body["text"] = arrayMsg[indx].text
        console.log("dentro del for ::: ", arrayMsg[indx] )
        arrayImagenes.push(body)
        indx = indx + 1
    });
    console.log("ARRAY GENERADOOOOO :::::   ", arrayImagenes)
    // _details.categorias[query.idCategoria].mensajes[query.idMensaje].imagenes = arrayCateg

    // const updateDoc3 = {
    //     $addToSet: {
    //         categorias: _details.categorias
    //     },
    // };
    // var savedMensaje2 = await Categoria.findOneAndUpdate(filter, updateDoc3, options);
    // console.log("res: ", savedMensaje2)
    // ******* aca va query imagArray y resArray
    // var arrayI = query.imageArray
    // var arrayR = query.respArray
    // arrayI.forEach(element => {
    //     element
    // });
    // arrayR.forEach(element => {
    //     element
    // });
    
    // var body = {
    //     idMensaje: 4,
    //     nameMensaje: "Prueba final",
    //     imagenes: arrayI,
    //     respuestas: arrayR
    // };
    // // ******* aca va query idCategoria
    // query.categorias[0].mensajes.push(body)
    // console.log("MENSAJEEEE:  ", query.categorias[0].mensajes)


    //mensaje.categorias[0].mensajes[0].imagenes[0]
    //query.categorias[query.idCategoria].mensajes.push()
    // Creating a new Mongoose Object by using the new keyword
    var newCategoria = new Categoria({
        email: query.email,
        categoria: query.categorias
    })

    try {
        //console.log("@@@@@@@@@    ", query.categorias[0].mensajes[0])
        //Saving the User 
        // var savedMensaje = await Categoria.findOneAndUpdate(filter, updateDoc, options);
        // console.log("res: ", savedMensaje)

        // var page = 1
        // var limit = 10
        // var options2 = {
        //     page,
        //     limit
        // }
        // var Categorias = await Categoria.paginate(filter, options2)
        // var index = 0
        // var imagenesListar = Categorias.docs[0].categorias[query.idCategoria].mensajes[idMensajes].imagenes
        // var categoriasNueva = query.categorias[query.idCategoria].mensajes[idMensajes].imagenes
        // imagenesListar.forEach(element => {
        //     categoriasNueva[index]["_id"] = element._id
        //     index = index + 1;
        // });
        // const updateDoc2 = {
        //     $addToSet: {
        //         categorias: categoriasNueva
        //     },
        // };
        // console.log("CATEGORIA NUEVAAA     ", categoriasNueva)
        // var saveImagenes = await Categoria.findOneAndUpdate(filter, updateDoc2, options);
        // console.log("res: ", saveImagenes)
        // //const res = await Categoria.deleteOne({ email: 'emabel.paco@gmail.com' });
        
        return "";
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating User")
    }
    
}

// Async function to get the User List
exports.getCategorias = async function (query, page, limit) {
    
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        var Categorias = await Categoria.paginate(query, options)
        console.log(Categoria.collection);
        // Return the Userd list that was retured by the mongoose promise
        return Categorias;

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Paginating Categorias');
    }
}

// TEAVISO Async function to get the categorias List by email identificatorio
exports.getCategoriasByEmail = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    console.log("@@@@@@ YYYYYYYYY     ", page, limit)
    var options = {
        page,
        limit
    }
    try {
        var Categorias = await Categoria.paginate(query, options)
        //console.log(Categorias.docs[0].categorias[0].mensajes[0]);
        // Return the Userd list that was retured by the mongoose promise
        return Categorias;

    } catch (e) {
        // return a Error message describing the reason 
        console.log(e);
        throw Error('Error while Paginating Categorias');
    }
}

exports.createUser = async function (user) {
    // Verifico si ya existe
    var _details = await User.findOne({
        email: user.email
    });
    if (_details) throw Error("01");


    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    var newUser = new User({
        email: user.email,
        password: hashedPassword,
        nombre: user.nombre,
        apellido: user.apellido,
        ultimoBackup: '',
    })

    try {
        // Saving the User 
        var savedUser = await newUser.save();

        return savedUser;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating User")
    }
}

exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        return _details;
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
    }

}

exports.guardarBackup = async function (backup) {
    // Verifico si ya existe
    var _details = await Backup.findOne({
        email: backup.email
    });
    if (_details) {
        await Backup.remove({
            email: backup.email
        });
    };


    // Creating a new Mongoose Object by using the new keyword

    var backup = new Backup({
        email: backup.email,
        egresos: backup.egresos,
        cuentas: backup.cuentas,
        ingresos: backup.ingresos,
        prestamos: backup.prestamos,
        presupuestos: backup.presupuestos,
        inversiones: backup.inversiones,
        tarjetas: backup.tarjetas,
        resumenes: backup.resumenes
    })

    try {
        // Saving the backup 
        var savedBackup = await backup.save();

        // Update last backup date
        let today = new Date();

        let date = today.getDate() + "-" + parseInt(today.getMonth() + 1) + "-" + today.getFullYear();

        User.findOneAndUpdate({ email: backup.email }, { ultimoBackup: date }, { upsert: true }, function (err, doc) {
            console.log("Fecha de ultimo backup actualizada");
        });

        return savedBackup;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Backup")
    }
}


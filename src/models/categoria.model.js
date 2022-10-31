const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

var ImagenesSchema = new mongoose.Schema({
    idImagen: String,
    image: String,
    text: String
})

var MensajesSchema = new mongoose.Schema({
    idMensaje: String,
    nameMensaje: String,
    imagenes: [ImagenesSchema],
    respuestas: [ImagenesSchema]
})

var CategoriasSchema = new mongoose.Schema({
    idCategoria: String,
    nameCategoria: String,
    imageCategoria: String,
    mensajes: [MensajesSchema]
})

const CategoriaSchema = new Schema({
    email: String,
    categorias: [CategoriasSchema]
})

CategoriaSchema.plugin(mongoosePaginate)
const CategoriaModel = mongoose.model('frasesGuardadas', CategoriaSchema)

module.exports = CategoriaModel
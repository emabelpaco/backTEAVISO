const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

const { Schema } = mongoose

var ImagenesSchema = new Schema({
    idImagen: String,
    image: String,
    text: String
})

ImagenesSchema.plugin(mongoosePaginate)
//const CategoriaModel = mongoose.model('frasesGuardadas', CategoriaSchema)

module.exports = ImagenesSchema
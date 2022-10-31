const mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const { Schema } = mongoose

const UsuarioSchema = new Schema({
    email: String,
    password: String,
    nombre: String
})

UsuarioSchema.plugin(mongoosePaginate)
const UsuariosModel = mongoose.model('usuarios', UsuarioSchema)

module.exports = UsuariosModel
const {Schema,model} = require('mongoose')


const userschema = Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    clients: {
        type: Array,
        default: []
    },
    pedidos: {
        type: Array,
        default: []
    },
    productos: {
        type: Array,
        default: []
    },
    transportistas: {
        type: Array,
        default: []
    },
    rutas: {
        type: Array,
        default: []
    },
    estado_de_envio: {
        type: Array,
        default: []
    },
    categorias: {
        type: Array,
        default: []
    },
})

module.exports = model('users', userschema)
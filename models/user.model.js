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
    }
})

module.exports = model('users', userschema)
const mongoose = require('mongoose')
const { Schema, model } = mongoose
const usersSchema = new Schema({
        userName: {
                type: String,
                required: true
        },
        Email: {
                type: String,
                required: true,
                unique: true
        },
        password: {
                type: String,
                required: true
        },
        isLogged: {
                type: Boolean,
                default: false
        },
        isActive: {
                type: Boolean,
                default: false
        },
    
       
        token: String
})


const usersModel = model('users', usersSchema)
module.exports = usersModel

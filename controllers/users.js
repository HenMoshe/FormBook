const Users = require('../models/users')
exports.userCreate = async function userCreate(data) {
    return await Users.create(data)
}
exports.display = async function display() {
    return await Users.find()
}
exports.displayOne = async function displayOne(filter) {
    return await Users.findOne(filter)
}
exports.userUpdate = async function userUpdate(id,  data ) {
    return await Users.findByIdAndUpdate(id,  data )
}

exports.login = async function login(Email, data) {
    return await Users.findOneAndUpdate(Email, data)
}
exports.logout = async function logout(id, data) {
    return await Users.findByIdAndUpdate(id, data)
}
exports.userStats = async function userStats(){
    return await Users.find().estimatedDocumentCount()    
}




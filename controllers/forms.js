const Forms = require('../models/forms')
exports.formCreate = async function formCreate(data ) {
    return await Forms.create(data)
}
exports.openformDisplay = async function openformsDisplay(filter) {
    return await Forms.find({formName:new RegExp(filter)})
}
exports.myformsDisplay = async function myformsDisplay(key,value) {
    return await Forms.find({ [key] : { $in : value }})
}

exports.doneformDisplay = async function doneformsDisplay(filter) {
    return await Forms.find({finished:{$elemMatch:{tested:filter}}})
}

exports.formdisplayOne = async function displayOne(filter) {
    return await Forms.findOne(filter)
}
exports.qaUpdate = async function qaUpdate(id,type, data ) {
    return await Forms.findByIdAndUpdate(id, { "$push": { [type]:data } })
}

exports.formsToDoRemove = async function formsToDoRemove(filter1,filter2) {
    return await Forms.updateOne(filter1,{"$pull": {"needsToDo":filter2}})
}
exports.formStats = async function formStats(){
    return await Forms.find().estimatedDocumentCount()    
}
exports.formUpdate = async function formUpdate(doc,newdoc){
    return await Forms.replaceOne(doc,newdoc)}
const mongoose = require('mongoose')
const { Schema, model } = mongoose


const formsSchema = new Schema({
        formName: {
                type: String,
                required: true
        },
        formDescription: {
                type: String,
                required: true
        },
        creationDate: {
                type: Date,
                default: Date.now(),

        },
        creator: {
                type: String,
                required: true
        },
        needsToDo:{type: Array,
                required: false,
                additionalItems:{
                    type:String}
               
        },
        creatorname:{type:String},
        finished:{type: Array,
                 required: false,
                donedate:{type:Date}
        },
        deadline: {
                type: Date,
               
        },
       
        formType: {
                type: String,
                enum: ['survey', 'test', 'unknown']
        },
        
        open: {
                type: Boolean,
                required: true
        },
        questions: {
                type: Array,
                additionalItems: {
                        Q_id: {
                                required: true,
                                type: String
                        },
                        name: {
                                type: String,
                                required: true
                        },
                        description: {
                                type: String,
                        },
                        qtype: {
                                type: String,
                                enum: ['bool', 'multi', 'unknowen']
                        },
                        most: {
                                type: Boolean,
                        },
                        score: { type: Number }
                }},
                answers: {
                        type: Array,
                        additionalItems: {
                                Q_id:{type:String,},
                                text:{ type:String,},
                                points:{type:String,}
                        },
                      
                        
                }
        
})


const formsModel = model('forms', formsSchema)
module.exports = formsModel

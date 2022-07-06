const mongoose = require('mongoose')
require('mongoose-type-url')

const Schema = mongoose.Schema

const projectSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    teamSize:{
        type: Number,
        required: true
    },
    desc:{
        type: String
    },
    link:{
        type: mongoose.SchemaTypes.Url,
        required: true
    }
},{timestamps : true})

module.exports = mongoose.model('project',projectSchema);
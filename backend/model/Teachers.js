const { Schema, model } = require('mongoose')

const Teachers_Table = Schema({
    fullname: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    position: { type: String, required: true }, 
    status: { type: String, required: true }, 
    department: { type: String, required: true }
})

module.exports = model('teachers_collections', Teachers_Table)

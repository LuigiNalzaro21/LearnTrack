const { Schema, model } = require('mongoose')

const dataTable = Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = model('signup_collections', dataTable)
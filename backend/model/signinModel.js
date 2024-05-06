const { Schema, model } = require('mongoose')

const dataTable = Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = model('signin_collections', dataTable)
const { Schema, model } = require('mongoose')

const questionTable = Schema({
    question: { type: String, required: true }
})

module.exports = model('questions_collections', questionTable)
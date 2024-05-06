const { Schema, model } = require('mongoose');

const evaluateSchema = Schema({
    fullname: { type: String, required: true }, // Store teacher's name directly
    questionsAndAnswers: [{
        question: { type: String, required: true },
        answer: { type: String, required: true }
    }]
});

module.exports = model('evaluations_collections', evaluateSchema);

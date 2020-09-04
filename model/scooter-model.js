const { Schema, model } = require('mongoose')

const scooter = new Schema({
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = model('Scooter', scooter);

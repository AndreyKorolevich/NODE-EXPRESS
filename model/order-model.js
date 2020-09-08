const {Schema, model} = require('mongoose')

const order = new Schema({
    scooters: [
        {
            scooter: {
                type: Object,
                required: true
            },
            count: {
                type: Number,
                required: true
            }
        }
    ],
    user: {
        name: {
            type: String
        },
        userId: {
             type: Schema.Types.ObjectId,
             ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('Order', order);
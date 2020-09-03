const { Schema, model } = require('mongoose')
const user = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    shoopCart: {
        elements: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1
                },
                scooterId: {
                    type: Schema.Types.ObjectId,
                    require: true
                }
            }
        ]

    },
})

module.exports = model('User', user);

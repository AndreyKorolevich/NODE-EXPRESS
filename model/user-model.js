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

user.methods.addToShoopCart = function(scooter) {
    const elements = [...this.shoopCart.elements];
   
    const index = elements.findIndex(elem => {
        console.log(elem.scooterId.toString())
        console.log(scooter._id.toString())
        return elem.scooterId.toString() === scooter._id.toString()
    })

    if (index >= 0) {
        elements[index].count++
    } else {
         elements.push({
             count: 1,
             scooterId: scooter._id
         })
    }  
     this.shoopCart = {elements}
     console.log(this.shoopCart)
     return this.save()
}

module.exports = model('User', user);

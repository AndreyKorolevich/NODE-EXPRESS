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
    shopCart: {
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

user.methods.addToShopCart = function(scooter) {
    const elements = [...this.shopCart.elements];
   
    const index = elements.findIndex(elem => {
        return elem.scooterId.toString() === scooter._id.toString();
    })

    if (index >= 0) {
        elements[index].count++
    } else {
         elements.push({
             count: 1,
             scooterId: scooter._id
         })
    }  
     this.shopCart = {elements}
     return this.save()
}
user.methods.deleteScooter = function(id) {
    let elements = [...this.shopCart.elements];
    const index = elements.findIndex(elem => {
        return elem.scooterId.toString() === id.toString();
    })
    if(elements[index].count === 1) {
        elements = elements.filter(elem =>  elem.scooterId.toString() !== id.toString())
    }else {
        elements[index].count--;
    }
    this.shopCart = {elements}
    return this.save()
}

module.exports = model('User', user);

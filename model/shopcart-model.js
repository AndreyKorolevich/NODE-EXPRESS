const path = require('path');
const fs = require('fs');

const pathData = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'shopcart.json'
)

class Shopcart {
    static async getAll() {
        return new Promise((res, rej) => {
            fs.readFile(pathData, 'utf-8', (err, content) => {
                if (err) {
                    rej(err)
                } else {
                    res(JSON.parse(content))
                }
            })
        })
    }

    static async add(scooter) {
        const shopcart = await Shopcart.getAll()

        const index = shopcart.scooters.findIndex(elem => elem.id === scooter.id)
        const candidate = shopcart.scooters[index]
        if (candidate) {
            candidate.count++
            shopcart.scooters[index] = candidate
        } else {
            scooter.count = 1
            shopcart.scooters.push(scooter)
        }

        shopcart.price += +scooter.price

        return new Promise((res, rej) => {
            fs.writeFile(pathData, JSON.stringify(shopcart), err => {
                if (err) {
                    rej(err)
                } else {
                    res()
                }
            })
        })
    }

    static async delete(id) {
        const shopcart = await Shopcart.getAll()

        const index = shopcart.scooters.findIndex(elem => elem.id === id)
        const scooter = shopcart.scooters[index]
        if (scooter.count === 1) {
            shopcart.scooters = shopcart.scooters.filter(elem => elem.id !== id)
        } else {
            shopcart.scooters[index].count--
        }

        shopcart.price -= scooter.price;
        return new Promise((res, rej) => {
            fs.writeFile(pathData, JSON.stringify(shopcart), err => {
                if (err) {
                    rej(err)
                } else {
                    res(shopcart)
                }
            })
        })
    }
}


module.exports = Shopcart;
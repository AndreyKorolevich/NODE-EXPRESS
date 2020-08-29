const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

class Scooter {
    constructor(model, price, picture, description) {
        this.model = model;
        this.price = price;
        this.picture = picture;
        this.description = description;
        this.id = uuidv4();
    }

    async save() {
        const scooters = await Scooter.getAll();
        scooters.push({
            model: this.model,
            price: this.price,
            picture: this.picture,
            description: this.description,
            id: this.id
        })
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '../data', 'scooters.json'),
                JSON.stringify(scooters),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve()    
                    }
                }
            )
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname,  '../data', 'scooters.json'),
                'utf-8',
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(data))
                    }
                })
        })
    }

     static async getScoot(id) {
        const scooters = await Scooter.getAll();
        return scooters.find(elem => elem.id === id)
    }

    static async edit(scooter) {
        console.log(scooter)
        const scooters = await Scooter.getAll()

        const index = scooters.findIndex(elem => elem.id === scooter.id);
        scooters[index] = scooter;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '../data', 'scooters.json'),
                JSON.stringify(scooters),
                (err) => {
                    if(err) {
                        reject(err);
                    } else {
                        resolve()    
                    }
                }
            )
        })
    }

}

module.exports = Scooter;
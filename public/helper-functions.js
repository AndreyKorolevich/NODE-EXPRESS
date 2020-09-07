const Scooter = require('../model/scooter-model.js');

exports.refactId = function(elem) {
    elem.id = elem._id;
    delete elem._id;
    return elem
}

exports.helper = async function(arr) {
    const scooters = [];
    for (const item of arr) {
        let scooter = await Scooter.findById(item.scooterId).lean();
        scooters.push({
            scooter,
            count: item.count
        })
    }
    return scooters;
}


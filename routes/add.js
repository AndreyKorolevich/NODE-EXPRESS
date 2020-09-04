const { Router } = require('express');
const Scooter = require('../model/scooter-model.js')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'add',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const scooter = new Scooter({
        model: req.body.model,
        price: req.body.price,
        picture: req.body.picture,
        description: req.body.description,
        userId: req.user._id
    });

    try {
        await scooter.save()
        res.redirect('/scooters')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
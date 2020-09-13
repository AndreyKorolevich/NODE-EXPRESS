const { Router } = require('express');
const Scooter = require('../model/scooter-model.js')
const router = Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true
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
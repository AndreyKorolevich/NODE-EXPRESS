const { Router } = require('express');
const Scooter = require('../model/scooter.js')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'add',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    const scooter = new Scooter(req.body.title, req.body.price, req.body.img, req.body.description);
    await scooter.save()
    res.redirect('/scooters')
})

module.exports = router
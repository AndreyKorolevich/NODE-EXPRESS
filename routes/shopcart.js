const { Router } = require('express');
const Shopcart = require('../model/shopcart-model')
const Scooter = require('../model/scooter-model.js');
const router = Router()

router.get('/', async (req, res) => {
    const shopcart = await Shopcart.getAll();
    res.render('shopcart', {
        title: 'Shopcart',
        isShopcart: true,
        scooters: shopcart.scooters,
        price: shopcart.price
    })
})

router.post('/add', async (req, res) => {
    const scooter = await Scooter.getScoot(req.body.id);
    await Shopcart.add(scooter);
    res.redirect('/shopcart')
})

router.delete('/delete/:id', async (req, res) => {
    const shopcart = await Shopcart.delete(req.params.id)
    res.status(200).json(shopcart)
})

module.exports = router
const { Router } = require('express');
const Scooter = require('../model/scooter-model.js');
const router = Router()

router.get('/', async (req, res) => {
    const shoopElements = await req.user.shoopCart.elements;
    const scooters = [];

    async function helper(arr) {
        for (const item of arr) {
            let scooter = await Scooter.findById(item.scooterId).lean();
            scooters.push({
                scooter,
                count: item.count
            })
        }
    }
    await helper(shoopElements)
    const price = scooters.reduce((sum, elem) => {
        return sum + (elem.scooter.price * elem.count)
    }, 0)
    res.render('shopcart', {
        title: 'Shopcart',
        isShopcart: true,
        scooters,
        price
    })
})

router.post('/add', async (req, res) => {
    const scooter = await Scooter.findById(req.body.id);
    await req.user.addToShoopCart(scooter);
    res.redirect('/shopcart');
})

router.delete('/delete/:id', async (req, res) => {
    const shopcart = await Shopcart.delete(req.params.id);
    res.status(200).json(shopcart);
})

module.exports = router
const {helper} = require("../public/helper-functions.js");
const {refactId}  = require('../public/helper-functions.js');
const {Router} = require('express');
const Scooter = require('../model/scooter-model.js');
const router = Router();

const sumPrice = (arr) => {
    return arr.reduce((sum, elem) => {
        return sum + (elem.scooter.price * elem.count)
    }, 0);
}

router.get('/', async (req, res) => {
    const shopElements = await req.user.shopCart.elements;
    const scooters = await helper(shopElements);
    const price = sumPrice(scooters);
    res.render('shopcart', {
        title: 'Shopcart',
        isShopcart: true,
        scooters,
        price
    })
})

router.post('/add', async (req, res) => {
    const scooter = await Scooter.findById(req.body.id);
    await req.user.addToShopCart(scooter);
    res.redirect('/shopcart');
})

router.delete('/delete/:id', async (req, res) => {
    await req.user.deleteScooter(req.params.id);
    const shopElements = await req.user.shopCart.elements;
    const scooters = await helper(shopElements);
    const price = sumPrice(scooters);
    const shopCart = {
        scooters,
        price
    }
    res.status(200).json(shopCart);

})

module.exports = router

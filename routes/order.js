const { Router } = require('express');
const {helper} = require("../public/helper-functions.js");
const Order = require('../model/order-model');
const Scooter = require('../model/scooter-model.js');
const auth = require('../middleware/auth-middleware'); 
const router = Router();

const createArrScooters = async (arr) => {
    const scooters = [];
    for (const item of arr) {
        let scooter = await Scooter.findById(item.scooter._id).lean();
        scooters.push({
            scooter,
            count: item.count
        })
    }
    return scooters;
}

const sumPrice = (arr) => {
    return arr.reduce((sum, elem) => {
        return sum + (elem.scooter.price * elem.count)
    }, 0);
}

router.get('/', auth, async (req, res) => {
    try {
        const order = await Order.find({ 'user.userId': req.user._id }).populate('user.userId');
        const ordersArr = [];
        for (const elem of order) {
            const scooters = await createArrScooters(elem.scooters);
            ordersArr.push({
                scooters,
                user: {
                    userId: elem.user.userId._id,
                    name: elem.user.userId.name
                },
                price: sumPrice(scooters),
                date: elem.date,
                idOrder: elem._id
            })
        }
        res.render('order', {
            title: 'Order',
            isOrder: true,
            ordersArr
        })
    } catch (err) {
    console.log(err)
    }
})


router.post('/', auth, async (req, res) => {
    try {
        const shopElements = await req.user.shopCart.elements;
        const scooters = await helper(shopElements);
        const order = new Order({
            scooters,
            user: {
                name: req.user.name,
                userId: req.user
            }
        });
        await order.save();
        await req.user.cleanShopCart();
        res.redirect('/order');
    } catch (err) {
        console.log(err)
    }

})


module.exports = router

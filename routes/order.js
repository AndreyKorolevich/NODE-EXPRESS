const {Router} = require('express');
const Order = require('../model/order-model');
const {helper} = require("../public/helper-functions.js");
const router = Router();

router.get('/', async (req, res) => {
    try {
        const order = await Order.find({'user.userId': req.user._id})
            .populate('user.userId');
        console.log(order)
        res.render('order', {
            title: 'Order',
            isOrder: true,
            order: order.map(elem => {
                    return {
                        ...elem._doc,
                        price: elem.scooters.reduce((total, e) => {
                            return total += e.count * e.scooter.price
                        }, 0)
                    }
                }
            )
        })

    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
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

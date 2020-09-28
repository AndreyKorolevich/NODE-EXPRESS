const { Router } = require('express');
const { validationResult } = require('express-validator/check');
const Scooter = require('../model/scooter-model.js');
const auth = require('../middleware/auth-middleware');
const { scooterValidators } = require('../public/validator');
const router = Router();

router.get('/', auth, scooterValidators, (req, res) => {
    res.render('add', {
        title: 'add',
        isAdd: true
    })
})

router.post('/', auth, scooterValidators, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('add', {
            title: 'add',
            isAdd: true,
            error: errors.array()[0].msg,
            data: {
                model: req.body.model,
                price: req.body.price,
                picture: req.body.picture,
                description: req.body.description 
            }
        })
    }
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
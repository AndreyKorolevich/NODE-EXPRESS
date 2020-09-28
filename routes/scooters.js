const {refactId}  = require('../public/helper-functions.js');
const { Router } = require('express');
const Scooter = require('../model/scooter-model.js');
const auth = require('../middleware/auth-middleware'); 
const { validationResult } = require('express-validator/check');
const { scooterValidators } = require('../public/validator');
const router = Router()

router.get('/', async (req, res) => {
    try {
        const scooters = await Scooter.find({}).populate('userId', 'email name').lean();
        scooters.forEach(elem => {
            elem = refactId(elem)
        })

        res.render('scooters', {
            title: 'scooters',
            isScooters: true,
            scooters
        })
    } catch (err) {
        console.error('Error')
    }

})

router.get('/:id', async (req, res) => {
    try {
        let scooter = await Scooter.findById(req.params.id).lean();
        scooter = refactId(scooter)
        res.render('scooter', {
            layout: 'new',
            title: `Scooter ${scooter.model}`,
            scooter
        })
    } catch (err) {
        console.error('Error')
    }
})

router.get('/:id/edit', auth, async (req, res) => {
    try {
        if (!req.query.red) {
            return res.redirect('/')
        }
        let scooter = await Scooter.findById(req.params.id).lean();
        scooter = refactId(scooter)
        res.render('scooter-edit', {
            title: `Scooter-edit`,
            scooter
        })
    } catch (err) {
        console.error('Error')
    }
})

router.post('/edit', auth, scooterValidators, async (req, res) => {
    const errors = validationResult(req);
    const { id } = req.body;
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
    delete req.body.id;
    await Scooter.findByIdAndUpdate(id, req.body);
    return res.redirect('/scooters');
})

router.post('/delete', auth, async (req, res) => {
    try {
        await Scooter.deleteOne({ _id: req.body.id });
        return res.redirect('/scooters');
    } catch (err) {
        console.log(err)
    }
})

module.exports = router

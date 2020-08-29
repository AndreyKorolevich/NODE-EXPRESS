const { Router } = require('express');
const Scooter = require('../model/scooter-model.js')
const router = Router()

router.get('/', async (req, res) => {
    try {
        const scooters = await Scooter.getAll()
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
        const scooter = await Scooter.getScoot(req.params.id);
        res.render('scooter', {
            layout: 'new',
            title: `Scooter`,
            scooter
        })
    } catch (err) {
        console.error('Error')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        if (!req.query.red) {
            return res.redirect('/')
        }
        const scooter = await Scooter.getScoot(req.params.id);
        res.render('scooter-edit', {
            title: `Scooter-edit`,
            scooter
        })
    } catch (err) {
        console.error('Error')
    }
})

router.post('/edit', async (req, res) => {
    await Scooter.edit(req.body);
    return res.redirect('/')
})

module.exports = router
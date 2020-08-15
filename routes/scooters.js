const { Router } = require('express');
const Scooter = require('../model/scooter.js')
const router = Router()

router.get('/', async (req, res) => {
    const scooters = await Scooter.getAll()
    res.render('scooters', {
        title: 'scooters',
        isScooters: true,
        scooters
    })
})

router.get('/:id', async (req, res) => {
    const scooter = await Scooter.getScoot(req.params.id);
    res.render('scooter', {
        layout: 'new',
        title: `Scooter ${scooter.title}`,
        scooter
    })
})

module.exports = router
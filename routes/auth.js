const { Router } = require('express');
const User = require('../model/user-model');
const router = Router();


router.get('/login', (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findById('5f5310c1b85ee22200059ec0');
    req.session.user = user
    req.session.isAuthenticated = true;
    req.session.save(err => {
        if (err) {
            throw err;
        }
        res.redirect('/')
    })
})

module.exports = router
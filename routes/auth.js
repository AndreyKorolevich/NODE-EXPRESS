const { Router } = require('express');
const { validationResult } = require('express-validator/check');
const User = require('../model/user-model');
const bcrypt = require('bcryptjs');
const router = Router();
const { registerValidators, loginValidators } = require('../public/validator')


router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Login',
        isLogin: true,
        logError: req.flash('logError'),
        regError: req.flash('regError'),
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login');
    })
})

router.post('/login', loginValidators, async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('logError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#login');
        }
        const user = await User.findOne({ email });
        req.session.user = user;
        req.session.isAuthenticated = true;
        req.session.save(err => {
            if (err) {
                throw err;
            }
            res.redirect('/')
        })
    } catch (err) {
        console.log(err);
    }

})

router.post('/register', registerValidators, async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register');
        }
        const hashPassword = await bcrypt.hash(password, 12);
        user = new User({
            email, name, password: hashPassword, shopCart: { elements: [] }
        })
        await user.save();
        res.redirect('login#login');
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
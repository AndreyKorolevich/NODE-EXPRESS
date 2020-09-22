const { Router } = require('express');
const { validationResult} = require('express-validator/check')
const User = require('../model/user-model');
const bcrypt = require('bcryptjs');
const router = Router();
const {registerValidators} = require('../public/validator')


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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        const pas = await bcrypt.compare(password, user.password);
        if (pas) {
            req.session.user = user
            req.session.isAuthenticated = true;
            req.session.save(err => {
                if (err) {
                    throw err;
                }
                res.redirect('/')
            })
        } else {
            req.flash('logError', 'There`s no such email or wrong password');
            res.redirect('/auth/login#login')
        }

    } catch (err) {
        console.log(err);
    }

})

router.post('/register', registerValidators, async (req, res) => {
    try {
        const { email, name, password, repeat } = req.body;
        let user = await User.findOne({ email });

        const errors = validationResult(req); 
        if(!errors.isEmpty()){
            req.flash('regError', errors.array()[0].msg);
            return res.status(422).redirect('/auth/login#register');
        }
        if (user) {
            req.flash('regError', 'There`s already user with such email');
            res.redirect('/auth/login#register');
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            user = new User({
                email, name, password: hashPassword, shopCart: { elements: [] }
            })
            await user.save();
            res.redirect('login#login');
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
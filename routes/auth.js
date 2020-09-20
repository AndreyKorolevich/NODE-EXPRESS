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
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        const pas = password === user.password;
        console.log(pas)
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
            res.redirect('/auth/login#register')
        }

    } catch (err) {

    }

})

router.post('/register', async (req, res) => {
    try {
        const { email, name, password, repeat } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            res.redirect('login#register')
        } else {
            user = new User({
                email, name, password, shopCart: { elements: [] }
            })
            await user.save();
            res.redirect('login#login')
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router
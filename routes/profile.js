const {Router} = require('express');
const auth = require('../middleware/auth-middleware');
const User = require('../model/user-model');
const router = Router();

router.get('/', auth, async (req, res) => {
    res.render('profile', {
        title: 'profile',
        isProfile: true,
        user: req.user.toObject()
    })
})

router.post('/', auth,  async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const toChange = {
            name: req.body.name
        }

        if(req.file) {
           toChange.avatarURL = req.file.path 
        }
        Object.assign(user, toChange);
        await user.save();
        res.redirect('/profile');
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;
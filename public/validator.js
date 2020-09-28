const { body } = require('express-validator/check');
const User = require('../model/user-model');
const bcrypt = require('bcryptjs');

exports.registerValidators = [
    body('email', 'Input correctly email')
        .isEmail()
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject('There`s already user with such email');
                }
            } catch (error) {
                console.log(error)
            }
        })
        .normalizeEmail(),
    body('name', 'The name must be at least 3 characters long')
        .isLength({ min: 3 })
        .trim(),
    body('password', 'The password must be at least 8 characters long')
        .isLength({ min: 8 })
        .isAlphanumeric()
        .trim(),
    body('repeat')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('The passwords must be the same');
            }
            return true
        })
        .trim()
];

exports.loginValidators = [
    body('email')
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (!user) {
                    return Promise.reject('There`s no such email or wrong password');
                }
            } catch (error) {
                console.log(error)
            }
        }),
    body('password')
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: req.body.email });
                const pas = await bcrypt.compare(value, user.password);
                if (!pas) {
                    return Promise.reject('There`s no such email or wrong password');
                }
            } catch (error) {
                console.log(error)
            }
        })];

exports.scooterValidators = [
    body('model', 'The mimimum length of the model name is 2 characters')
    .isLength({min: 2})
    .trim(),
    body('price', 'Enter the correct price').isNumeric(),
    body('picture', 'Enter the correct url').isURL(),
    body('description', 'The maximum length of the name is 150 characters')
    .isLength({max: 150})
    .trim(),
]       
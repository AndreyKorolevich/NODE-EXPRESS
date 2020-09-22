const {body} = require('express-validator/check');

exports.registerValidators = [ 
    body('email', 'Input correctly email').isEmail(),
    body('name', 'The name must be at least 3 characters long').isLength({min: 3}),
    body('password', 'The password must be at least 8 characters long').isLength({min: 8}).isAlphanumeric(),
    body('repeat').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('The passwords must be the same');
        }
        return true
    })
]
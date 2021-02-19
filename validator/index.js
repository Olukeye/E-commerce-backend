exports.signupValidator = (req, res, next) => {
    req.check('name', 'please name is required!').notEmpty();
    req.check('email', 'valid email is required')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain @')
    .isLength({
        min:4,
        max:25
    })

    req.check('password', 'Password is required').notEmpty();
    req.check('password')
    .isLength({min: 5})
    .withMessage('password is too short, must contain at least 8 characters!')
    .matches(/\d/)
    .withMessage('Passsword must contain a number!');

    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({error:firstError});
    }
    next()
}

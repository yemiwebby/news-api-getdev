import validator from 'validator';


const validateUserSignIn = (req, res, next) => {
    // check for empty fields
    if (!req.body.username || !req.body.password) {
        return res.status(401).json({
            message: "All or some of the field is/are undefined",
        });
    }

    if (validator.isEmpty(req.body.username)) {
        return res.status(401).json({
            message: 'Username field is required',
        })
    }

    if (!validator.isLength(req.body.username, { min: 3, max: 50 })) {
        return res.status(406).send({
            status: 'Fail',
            message: "Username should be between 3 and 50 characters",
        });
    }

    if (validator.isEmpty(req.body.password)) {
        return res.status(401).json({
            message: 'Please enter a password',
        });
    }

    next();
};

export default validateUserSignIn;

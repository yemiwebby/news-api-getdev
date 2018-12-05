import validator from 'validator';


const validateUserReg = (req, res, next) => {
    // check for empty fields
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.bio) {
        return res.status(401).json({
            message: "All or some of the field is/are undefined",
        });
    }

    if (validator.isEmpty(req.body.name)) {
        return res.status(401).json({
            message: 'Name field is required',
        })
    }

    if (validator.isEmpty(req.body.password)) {
        return res.status(401).json({
            message: 'Please enter a password',
        });
    }

    next();
};

export default validateUserReg;

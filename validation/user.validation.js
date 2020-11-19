const {signIn, logIn} = require("./user.schema")


exports.signInValidation = async (req, res, next) => {
    const value = await signIn.validate(req.body);
    if (value.error) {
        res.status(400).json({
            message: value.error.details[0].message
        })
    } else {
        next();
    }
}

exports.logInValidation = async (req, res, next) => {
    const value = await logIn.validate(req.body);
    if (value.error) {
        res.status(400).json({
            message: value.error.details[0].message
        })
    } else {
        next();
    }
}


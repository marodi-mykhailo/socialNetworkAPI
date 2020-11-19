const joi = require('@hapi/joi')

const schema = {
    signIn: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
        role: joi.string().valid("basic", "worker", "admin").required(),
    }),
    logIn: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).required(),
    })
}

module.exports = schema;

const Joi = require('@hapi/joi');

const registerValidation = body =>{
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return { error } = schema.validate(body);
}

const loginValidation = body =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })

    return { error } = schema.validate(body);
}

module.exports = {registerValidation , loginValidation};

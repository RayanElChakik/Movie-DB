const Joi = require('@hapi/joi');
const { Schema } = require('mongoose');

// Register Validation
const registerValidation = data => {
    const schema = Joi.object({ 
        name: Joi.string()
                .min(3)
                .required(),
        userName: Joi.string()
                      .min(3)
                     .required(),
        password: Joi.string() 
                     .min(6) 
                    .required() });
        return schema.validate(data);
}

//Login  Validation
const loginValidation = data => {
    const schema = Joi.object({ 
        userName: Joi.string()
                      .min(3)
                     .required(),
        password: Joi.string() 
                     .min(6) 
                    .required() });
        return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
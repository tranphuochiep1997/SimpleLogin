const Joi = require('joi');

module.exports = {
    body: {
        email: Joi.string().email({minDomainAtoms: 2}).required(),
        password: Joi.string().min(1).required(),
    }
}
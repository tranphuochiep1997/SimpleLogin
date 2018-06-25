const Joi = require('joi');

module.exports = {
    body: {
        userName: Joi.string().allow(null).allow(""),
        password: Joi.string().required(),
        email: Joi.string().email({minDomainAtoms: 2}).required()
    }
};
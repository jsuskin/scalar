const Joi = require('@hapi/joi');

const registerValidation = data => {
  // console.log(data)
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  // return Joi.validate(data, schema);
  const validation = schema.validate(data);
  // console.log(validation)
  return validation;
}

const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });
  // return Joi.validate(data, schema);
  return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
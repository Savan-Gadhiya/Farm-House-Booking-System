const Joi = require("joi");

// Register Validation
exports.registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

// Login Validation
exports.loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

exports.userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    phoneNumber: Joi.string().min(10).max(13),
    emergencyPhoneNumber: Joi.string().min(10).max(13),
    dob: Joi.date(),
    idProof: Joi.string(),
  });
  return schema.validate(data);
};

exports.addressValidation = (data) => {
  const schema = Joi.object({
    addressLine1: Joi.string().min(3).max(255),
    city: Joi.string().min(2).max(20),
    pincode: Joi.string().min(6),
    state: Joi.string().min(3),
    country: Joi.string().min(3),
  });
  return schema.validate(data);
};

exports.reviewValidation = (data) => {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5),
    review: Joi.string().min(3),
  });
  return schema.validate(data);
};

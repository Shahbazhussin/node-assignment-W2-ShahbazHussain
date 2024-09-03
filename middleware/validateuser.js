const { body, param } = require('express-validator');

const validateUserSignUp = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),

  body('email')
    .isEmail()
    .withMessage('Must be a valid email address')
    .notEmpty()
    .withMessage('Email is required'),

  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];

const validateUserLogIn = [
  
    body('email')
      .isEmail()
      .withMessage('Must be a valid email address')
      .notEmpty()
      .withMessage('Email is required'),
  
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ];

const validateUserId = [
  param('id')
    .isMongoId()
    .withMessage('User ID must be a valid MongoDB ObjectId'),
];

module.exports = {
    validateUserSignUp,
    validateUserLogIn,
    validateUserId
}
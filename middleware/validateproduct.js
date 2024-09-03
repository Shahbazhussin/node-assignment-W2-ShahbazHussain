const { body, param } = require('express-validator');

const validateProduct = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage('Name is required'),

  body('description')
    .isString()
    .isLength({ min: 5 })
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description is required'),

  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .notEmpty()
    .withMessage('Price is required'),

  body('category')
    .isMongoId()
    .withMessage('Category ID must be a valid MongoDB ObjectId'),

];

const validateProductId = [
  param('id')
    .isMongoId()
    .withMessage('Product ID must be a valid MongoDB ObjectId'),
];


module.exports = {
    validateProduct,
    validateProductId
};
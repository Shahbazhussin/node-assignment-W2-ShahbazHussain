const { body, param } = require('express-validator');
const validateCategory = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name is required'),
];

const validateCategoryId = [
  param('id')
    .isMongoId()
    .withMessage('Category ID must be a valid MongoDB ObjectId'),
];
module.exports = {
    validateCategory,
    validateCategoryId
}
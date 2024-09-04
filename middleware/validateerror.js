const { validationResult } = require('express-validator');
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
 
  if (!errors.isEmpty()) {
    const fieldError = errors.array();
    const errorList = fieldError.map(error => ({
        msg : error.msg
    }))
        return res.status(400).json({ msg: errorList });
    }
  next();
};


module.exports = handleValidationErrors;


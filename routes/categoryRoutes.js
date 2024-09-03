const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authenticateJWT");
const {validateCategory} = require('../middleware/validatecategory');
const validateError = require('../middleware/validateerror');

router.post("/createCategory", authMiddleware, validateCategory , validateError, categoryController.createACategory);

module.exports = router;

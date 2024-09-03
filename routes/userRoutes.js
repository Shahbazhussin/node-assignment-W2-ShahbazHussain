const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/authenticateJWT');
const validateError = require('../middleware/validateerror')
const { validateUserSignUp , validateUserLogIn } = require('../middleware/validateuser');

router.post("/signup", validateUserSignUp , validateError, userController.registerUser);
router.post("/login", validateUserLogIn ,validateError , userController.loginUser);
router.get("/products", authMiddleware , userController.getUserProducts);

module.exports = router;
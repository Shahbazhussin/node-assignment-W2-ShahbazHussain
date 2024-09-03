require("dotenv").config();
const secretKey = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

//Token Creation
const generateToken = (userPayload) => {
    return jwt.sign(userPayload, secretKey, {
        expiresIn: 300000,
    });
};

module.exports = generateToken;
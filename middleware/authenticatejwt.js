require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");

//Token Verification from authorization Header
const verifyToken = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res
            .status(401)
            .json({ error: "Authorization Field Not Found in Req Header" });
 
    const token = authorization.split(" ")[1];

    if (!token)
        return res.status(401).json({ error: "User is not Authorized" });

    try {
        const decodedPayload = jwt.verify(token, SECRET_KEY);
        if (!decodedPayload)
            return res.status(401).json({ error: "Token is Invalid" });

        req.user = decodedPayload;
        req.userId = decodedPayload.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Failed to verify token" });
    }
};

module.exports = verifyToken;
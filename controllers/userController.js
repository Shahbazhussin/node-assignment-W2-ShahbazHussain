const userServices = require("../services/userServices");

//User Signup 
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const {token} = await userServices.signup({
      name,
      email,
      password,
    });
    res.status(201).json({ Token: token, message: "User Created" });
  } catch (err) {
    res.status(400).json({ error: "User already Exists" });
  }
};

//User Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userServices.login({
      email,
      password
    });
    return res.status(201).json({message : 'login' , Token : token});
  } catch (err) {
    return res.status(500).json({ error: "User Credentials not matched" });
  }
};


//Retrieve all products created by that specific user
exports.getUserProducts = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await userServices.getProducts(userId);
    res.status(201).json({message : data});
  } catch (err) {
    return res.status(400).json({ error: "Error ocuurred during product fetching of admin" });
  }
};

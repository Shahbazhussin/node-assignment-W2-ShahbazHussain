const userMapper = require("../mappers/userMapper");
const productModal = require("../modals/product");
const generateToken = require("../middleware/createJwt");
exports.signup = async ({ name, email, password }) => {
  try {
    const checkUserExistence = await userMapper.findByEmail(email);
    if (!checkUserExistence) {
      const user = await userMapper.addToDB({ name, email, password });
      if (user) {
        const userPayload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        const token = generateToken(userPayload);
        return { token };
      }
    }
  } catch (err) {
    console.error("Error Signup User:", err);
    throw new Error("Error Signup User");
  }
};

exports.login = async ({ email, password }) => {
  try {
    const userExists = await userMapper.findByEmail(email);
    if (userExists && (await userExists.comparePasswords(password))) {
      const userPayload = {
        id: userExists.id,
        email: email,
        password: password,
      };
      const token = generateToken(userPayload);
      return token;
    }
  } catch (err) {
    console.error("Error creating category:", err);
    throw new Error("Invalid Credentials");
  }
};

exports.getUser = async (email) => {
  try {
    const data = await userMapper.findByEmail(email);
    return data;
  } catch (err) {
    console.error("Error occurred during fetching user:", err);
    throw new Error("Error occurred during fetching user");
  }
};

exports.getProducts = async (id) => {
  try {
    const user = await userMapper.findUser(id);
    const products = await userMapper.findProducts(user.products);
    const productItems = products.map((product) => ({
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images,
    }));
    return productItems;
  } catch (err) {
    console.error("Error during products retrieval:", err);
    throw new Error("Error during products retrieval");
  }
};

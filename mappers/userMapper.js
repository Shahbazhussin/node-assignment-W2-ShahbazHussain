const userModal = require("../modals/user");
const productModal = require("../modals/product");

exports.findByEmail = async (email) => {
    try {
        return await userModal.findOne({ email: email });
    } catch (err) {
        throw new Error("Error finding user by email");
    }
};

exports.addToDB = async ({ name, email, password }) => {
    try {
        const User = new userModal({
            name: name,
            email: email,
            password: password,
        });

        const savedUser = await User.save();
        return { id: savedUser._id, name: savedUser.name, email: savedUser.email };
    } catch (err) {
        throw new Error("Error during adding to Database");
    }
};

exports.findProducts = async (ids) => {
    try {
        const products = await productModal.find({
            _id: { $in: ids },
        });
        return products;
    } catch (err) {
        throw new Error("Error during products retrievals");
    }
};

exports.findUser = async (id) => {
    try {
        const user = await userModal.findById(id);
        return user;
    } catch (err) {
        throw new Error("Error during product retrieval");
    }
};

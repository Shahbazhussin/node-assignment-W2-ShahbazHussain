const productMapper = require("../mappers/productMapper");
const User = require("../modals/user");
const Category = require("../modals/category");

exports.createProduct = async ({
    name,
    description,
    price,
    category,
    images,
    userId,
}) => {
    try {
        const product = await productMapper.mapProduct({
            name,
            description,
            price,
            category,
            images,
            userId,
        });

        const savedProduct = await product.save();
        await Category.findByIdAndUpdate(category, {
            $push: { products: savedProduct._id },
        });
        await User.findByIdAndUpdate(userId, {
            $push: { products: savedProduct._id },
        });
        return savedProduct;
    } catch (err) {
        console.error("Error during product creation", err);
        throw new Error("Error during product creation");
    }
};

exports.updateProduct = async ({
    prodId,
    name,
    description,
    price,
    category,
    images,
}) => {
    try {
        const product = await productMapper.searchById(prodId);
        if (!product) {
            throw new Error("Product not found");
        }

        product.name = name;
        product.description = description;
        product.price = price;

        if (product.category.toString() !== category) {
            await Category.findByIdAndUpdate(product.category, {
                $pull: { products: product.id },
            });

            product.category = category;

            await Category.findByIdAndUpdate(category, {
                $push: { products: product.id },
            });
        }

        product.images = images;

        const saved = await productMapper.addToDB(product);

        return saved;
    } catch (err) {
        console.error("Error during product updation:", err);
        throw new Error("Error during product updation", err);
    }
};

exports.deleteProduct = async (prodId) => {
    try {
        const product = await productMapper.searchById(prodId);
        if (!product) {
            throw new Error("Product not found");
        }
        const result = await productMapper.findAndDelete(prodId);
        await Category.findByIdAndUpdate(product.category, {
            $pull: { products: product.id },
        });
        await User.findByIdAndUpdate(product.userId, {
            $pull: { products: product.id },
        });
        return result;
    } catch (err) {
        console.error("Error during product deletion", err);
        throw new Error("Error during product Deletion", err);
    }
};

exports.getProducts = async (userId) => {
    try {
        const products = await productMapper.fetchAllProducts(userId);
        return products;
    } catch (err) {
        console.error("Error during products retrieval", err);
        throw new Error("Error during products retrieval", err);
    }
};

exports.getCategoryProducts = async (id) => {
    try {
        const products = await productMapper.fetchAllProductsByCategory(id);
        return products;
    } catch (err) {
        console.error("Error during product retrieval by category", err);
        throw new Error("Error during product retrieval by category", err);
    }
};
exports.getProduct = async (id) => {
    try {
        const product = await productMapper.searchById(id);
        return product;
    } catch (err) {
        console.error("Error during product retrieval", err);
        throw new Error("Error during product retrieval", err);
    }
};

exports.fetchProducts = async () => {
    try {
        const products = await productMapper.fetchProducts();
        return products;
    } catch (err) {
        console.error("Error during products retrieval", err);
        throw new Error("Error during products retrieval");
    }
};

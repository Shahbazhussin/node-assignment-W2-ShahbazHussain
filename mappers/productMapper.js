const productModal = require('../modals/product');
exports.mapProduct = async ({ name, description, price, category, images, userId }) => {
    try {
        const product = new productModal({
            name,
            description,
            price,
            category,
            images,
            userId
        });
        return product;

    } catch (err) {
        if (err == 'Validation Error') {
            return { err: 'Validation Error' };
        }
        else {
            throw new Error('Product Creation failed', err);
        }
    }
};
exports.addToDB = async (product) => {
    try {
        const savedProduct = await product.save();
        return savedProduct;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new Error('Validation Error: ' + err.message);
        } else {
            throw new Error('Failed to save product to database');
        }
    }
};
exports.searchById = async (prodId) => {
    try {
        const product = await productModal.findById(prodId);
        return product;

    } catch (err) {
        throw new Error("Error finding product by Id");
    }
};
exports.findAndDelete = async (prodId) => {
    try {
        return await productModal.findByIdAndDelete(prodId);
    } catch (err) {
        throw new Error("Error finding product by Id during deletion");
    }
};

exports.fetchAllProducts = async (userId) => {
    try {
        const products = await productModal.find({ userId: userId });
        const returnProducts = products.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images

        }));
        console.log('fetched products', returnProducts);
        return returnProducts
    } catch (err) {
        throw new Error("Error during retrieving products");
    }
}

exports.fetchAllProductsByCategory = async (id) => {
    try {
        const products = await productModal.find({ category: id });
        const returnProducts = products.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images
        }));
        return returnProducts
    } catch (err) {
        throw new Error("Error during fetching products by category");
    }
}

exports.fetchProducts = async (id) => {
    try {
        const products = await productModal.find();
        const returnProducts = products.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            images: product.images,
            userId: product.userId
        }));
        return returnProducts
    } catch (err) {
        throw new Error("Error during fetching products");
    }
}
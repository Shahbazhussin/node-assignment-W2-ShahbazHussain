const Category = require('../modals/category');
exports.addCategory = async (name) => {
    try {
        const category = new Category({ name: name });
        return category;
    } catch (err) {
        console.error("Error creating category:", err);
        throw new Error("Error creating category");
    }
};


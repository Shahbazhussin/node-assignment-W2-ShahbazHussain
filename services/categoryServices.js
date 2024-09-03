const categoryMapper = require("../mappers/categoryMapper");
exports.createCategory = async (name) => {
    try {
        const category = await categoryMapper.addCategory(name);
        return category.save();
    } catch (err) {
        console.error("Error creating category:", err);
        throw new Error("Error creating category");
    }
};

const categoryServices = require('../services/categoryServices');

//authenticated user can only create a category
exports.createACategory = async(req,res)=>{
    try {
        const {name} = req.body;
        const category = await categoryServices.createCategory(name);
        return res.status(201).json({ categoryCreated: category});
    }
     catch (err) {
        return res.status(400).json({ 
            message: "Category creation failed" ,
            error : err.message
        });
    }
};

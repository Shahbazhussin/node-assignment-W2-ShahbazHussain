const productServices = require("../services/productServices");

//authenticated user can only create a Product
exports.createAProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const imageUrls = req.files;
    if (!imageUrls || imageUrls.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
      }
    const images = imageUrls.map((file) => file.path);
    const newProduct = await productServices.createProduct({
      name,
      description,
      price,
      category,
      images,
      userId: req.userId,
    });
    return res.status(201).json({ productCreated: newProduct });
  } catch (err) {
    return res.status(400).json({
      message: "Product Creation Failed",
      error: err.message,
    });
  }
};

//authenticated user can only update a Product
exports.updateAProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const { name, description, price, category } = req.body;
    const imageUrls = req.files;
    const images = imageUrls.map((file) => file.path);
    const updatedProduct = await productServices.updateProduct({
      prodId,
      name,
      description,
      price,
      category,
      images,
    });

    return res.status(201).json({
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(400).json({
      message: "Update operation denied",
      error: err.message,
    });
  }
};

//authenticated user can only delete a product
exports.deleteAProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    await productServices.deleteProduct(prodId);
    return res.status(200).json({ message: "Product deleted Successfully" });
  } catch (err) {
    return res.status(400).json({
      error: "Delete operation denied",
      error: err.message,
    });
  }
};


//Retrive A product by user Id who created that product
exports.getProductsByUserId = async (req, res) => {
  try {
    const userId = req.params.id;
    const products = await productServices.getProducts(userId);
    return res.status(200).json({ fetchedProducts: products });
  } catch (err) {
    return res.status(404).json({
        message : "Error during fetching products by user Id",
        error : err.message
     });
  }
};

//Retrieving products by category
exports.getProductsBycategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const products = await productServices.getCategoryProducts(categoryId);
    return res.status(200).json({ fetchedProducts: products });
  } catch (err) {
    return res.status(404).json({
         message: "Error during fetching products",
         error : err.message
        });
  }
};

//Retrieving product by id
exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productServices.getProduct(id);
    return res.status(200).json({ fetchedProduct: product });
  } catch (err) {
    return res.status(404).json({
        message : "Error during fetching product",
        error : err.message
        });
  }
};

//Retrieving All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productServices.fetchProducts();
    res.status(200).json({ products: products });
  }catch(err){
  return res.status(400).json({
    message : "Error during fetching product",
    error : err.message
    });
}
};

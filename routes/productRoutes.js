const express = require("express");
const multer = require('../middleware/multer');
const router = express.Router();
const productController = require("../controllers/productController");
const {validateUserId} = require('../middleware/validateuser');
const {validateCategoryId} = require('../middleware/validatecategory');
const handleValidationErrors = require('../middleware/validateerror');
const authMiddleware = require("../middleware/authenticateJWT");
const { validateProduct , validateProductId } = require('../middleware/validateproduct');

router.post("/createProduct", authMiddleware , multer.array('images' , 5) , validateProduct, handleValidationErrors,  productController.createAProduct);
router.put("/updateProduct/:id", authMiddleware, multer.array('images' , 5), validateProductId ,validateProduct , handleValidationErrors, productController.updateAProduct);
router.delete("/deleteProduct/:id", authMiddleware,validateProductId,handleValidationErrors, productController.deleteAProduct);
router.get("/user/:id" , authMiddleware ,validateUserId, handleValidationErrors, productController.getProductsByUserId);
router.get("/category/:id" , authMiddleware , validateCategoryId , handleValidationErrors ,productController.getProductsBycategory);
router.get("/:id" , authMiddleware , validateProductId, handleValidationErrors,productController.getProductById);
router.get("" , authMiddleware , productController.getAllProducts);


module.exports = router;

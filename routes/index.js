//Central Routes Handler
const express = require('express');
const router = express.Router();
const categoryRoutes = require('./categoryRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');

router.use('/category' , categoryRoutes);
router.use('/users' , userRoutes);
router.use('/products' , productRoutes);

module.exports = router;



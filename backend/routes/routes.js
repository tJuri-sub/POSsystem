const express = require('express');
const router = express.Router();
const { addProducts, getProducts } = require('../controller/crudController');

router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);

module.exports = router;
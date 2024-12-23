const express = require('express');
const router = express.Router();
const { addProducts, getProducts, putProducts, deleteProducts } = require('../controller/controller');

//CRUD
router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);
router.put("/putProducts/:id", putProducts);
router.delete("/deleteProducts/:id", deleteProducts);

//AUTH

module.exports = router;
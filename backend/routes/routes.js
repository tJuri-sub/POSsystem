const express = require('express');
const router = express.Router();
const {
    addProducts, 
    getProducts, 
    putProducts, 
    deleteProducts, 
    registration,
    loginUser,
    logoutUser
} = require('../controller/controller');

//CRUD
router.post("/addProducts", addProducts);
router.get("/getProducts", getProducts);
router.put("/putProducts/:id", putProducts);
router.delete("/deleteProducts/:id", deleteProducts);

//AUTH
router.post("/register", registration);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

module.exports = router;
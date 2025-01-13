const express = require('express');
const router = express.Router();
const {
    addProducts, 
    getProducts, 
    putProducts, 
    deleteProducts, 
    registration,
    loginUser,
    logoutUser,
    getProfile
} = require('../controller/controller');
const { authorize } = require('../middleware/authorization');

//CRUD
router.post("/addProducts", authorize, addProducts);
router.get("/getProducts", authorize,  getProducts);
router.put("/putProducts/:id", authorize,  putProducts);
router.delete("/deleteProducts/:id", authorize,  deleteProducts);

//AUTH
router.post("/register", registration);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authorize,  getProfile);

module.exports = router;
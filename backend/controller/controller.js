const Product = require('../model/products');
const User = require('../model/user');

const {hashPassword, comparePassword} = require('../helper/auth');
const jwt = require('jsonwebtoken');

//============================================================
//      CRUD Functions
//============================================================

//POST Products
const addProducts = async (req, res) => {
    try{
        const { productName, quantity, price } = req.body;

        if( !productName || !quantity || !price )
        {
            return res. json({
                error: "fields empty"
            })
        }

        const exist = await Product.findOne({productName});

        if(exist){
            return res.json({
                error: "Product is already added.",
            })
        }

        const product = await Product.create({
            productName,
            price,
            quantity
        });
        
        return res.json({ message: " product added. ", product});
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Server error" }); 
    }
};

//GET Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().select(" -_id -createdAt -__v"); 

        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found" }); 
        }

        res.json(products); 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Server error" }); 
    }
};

//PUT Products
const putProducts = async (req, res) => {
    try {
    
        const { id } = req.params;
        const updatedData = req.body;

        if (!id || Object.keys(updatedData).length === 0) {
            return res.status(400).json({ error: "Invalid ID or no data provided" });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,                
            updatedData,         
            { new: true }      
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({  message: " product updated. ",updatedProduct});
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "Server error" }); 
    }
};

//DELETE Products
const deleteProducts = async (req, res) => {
    try{

        const { id } = req.params;

        const deleteProd = await Product.findByIdAndDelete(id);

        if(!deleteProd){
            return res.json({error: "Product already deleted."});
        }

        res.json({ message: "Product deleted successfully." });
    }catch(error){
        console.error(error); 
        res.status(500).json({ error: "Server error" });
    }
};

//============================================================
//      AUTHENTICATION & AUTHORIZATION
//============================================================

//Sign up (Registration)
const registration = async (req, res) => {
    try{
        const { firstname, lastname, username, password } = req.body;


        if(!firstname || !lastname || !username || !password ) {
            return res.json({
                error: "Fields empty"
            })
        }

        const exist = await     User.findOne({username});

        if(exist) {
            return res.json({error: "Username is already taken."})
        }

        const hashedPassword = await hashPassword(password);

        const userCreate = await User.create({
            firstname,
            lastname, 
            username, 
            password: hashedPassword 
        });

        return res.json({message: "Account created.", userCreate})
    }catch(error){
        console.error(error); 
        res.status(500).json({ error: "Server error" });
    }
};

//Sign in (Login)
const loginUser = async (req, res) => {
    try{

        const { username, password } = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.json({
                error: "user not found. "
            })
        }

        const matchPass = await comparePassword(password, user.password);

        if(matchPass) {
            jwt.sign({id: user._id, username: user.username }, process.env.JWT_SECRET, {}, (err, token) => { 
                if(err) throw err;
                res.cookie("token", token).json(user);
            })
        }
        if (!matchPass) {
            res.json({
              error: "password do not match",
            });
          }
    }catch(error){
        console.error(error); 
        res.status(500).json({ error: "Server error" });
    }
};

//Log out
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully. "});
};


module.exports = {
    addProducts,
    getProducts,
    putProducts,
    deleteProducts,
    registration,
    loginUser,
    logoutUser
};
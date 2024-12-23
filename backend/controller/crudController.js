const Product = require('../model/products');

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
        
        return res.json(product);
    }catch(error){
        console.log(error);
        res.status(500).json({ error: "Server error" }); 
    }
}

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


module.exports = {
    addProducts,
    getProducts
};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
  
})

const ProductsModel = mongoose.model("Products", productSchema);
module.exports = ProductsModel;
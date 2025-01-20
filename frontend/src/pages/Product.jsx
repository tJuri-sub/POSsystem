import { useState } from "react";
import axios from "axios";
import Header from "../components/header";

function Production() {
  const [product, setProduct] = useState({
    productName: "",
    quantity: "",
    price: "",
  });

  const addProd = async (e) => {
    e.preventDefault();

    const { productName, quantity, price } = product;

    // Validation: Ensure all fields are filled
    if (!productName || !quantity || !price) {
      console.error("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/addProducts", {
        productName,
        quantity,
        price,
      });

      // Check if the request was successful
      if (response.status === 200) {
        console.log("Product added successfully:", response.data);

        // Clear the form after successful submission
        setProduct({ productName: "", quantity: "", price: "" });
      } else {
        console.error(
          "Failed to add product:",
          response.data.message || "Unknown error"
        );
      }
    } catch (error) {
      // Handle network or server errors
      console.error(
        "Error adding product:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={addProd}>
        <input
          type="text"
          placeholder="Product Name"
          value={product.productName}
          onChange={(e) =>
            setProduct({ ...product, productName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Production;

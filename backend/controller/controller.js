const Product = require("../model/products");
const User = require("../model/user");

const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");

//============================================================
//      CRUD Functions
//============================================================

//POST Products
const addProducts = async (req, res) => {
  try {
    const { productName, quantity, price } = req.body;

    if (!productName || !quantity || !price) {
      return res.json({
        error: "fields empty",
      });
    }

    const exist = await Product.findOne({ productName });

    if (exist) {
      return res.json({
        error: "Product is already added.",
      });
    }

    const product = await Product.create({
      productName,
      price,
      quantity,
    });

    return res.json({ message: " product added. ", product });
  } catch (error) {
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

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: " product updated. ", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//DELETE Products
const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProd = await Product.findByIdAndDelete(id);

    if (!deleteProd) {
      return res.json({ error: "Product already deleted." });
    }

    res.json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//============================================================
//      AUTHENTICATION & AUTHORIZATION
//============================================================

//Sign up (Registration)
const registration = async (req, res) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    if (!firstname || !lastname || !username || !password) {
      return res.json({
        error: "Fields empty",
      });
    }

    const exist = await User.findOne({ username });
    if (exist) {
      return res.json({ error: "Username is already taken." });
    }

    const hashedPassword = await hashPassword(password);

    const userCreate = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Account created.", userCreate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//Sign in (Login)
const loginUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare password
    const matchPass = await comparePassword(password, user.password);
    if (!matchPass) {
      return res.status(401).json({ error: "Password does not match" });
    }

    // Generate JWT
    jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) {
          console.error("JWT signing error:", err);
          throw err;
        }

        // Set token in cookies
        res
          .cookie("jwt", token, {
            httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
            secure: process.env.NODE_ENV === "production", // Secure in production
          })
          .json({ message: "Login successful", user });
      }
    );
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

//Log out
const logoutUser = (req, res) => {
  const token = req.cookies?.jwt; // Check if the token exists in the cookies

  if (!token) {
    // User is already logged out
    return res.status(400).json({ error: "You're already logged out." });
  }

  // Clear the token cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookie in production
  });

  res.status(200).json({ message: "Logged out successfully." });
};

//Profile
const getProfile = async (req, res) => {
  try {
    const token = req.cookies?.jwt; // Use consistent cookie name

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No token provided." });
    }

    // Verify JWT
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Invalid or expired token." });
      }

      // Fetch user by ID from the decoded token
      const userData = await User.findById(decoded.userId).select(
        "firstname lastname username"
      );
      if (!userData) {
        return res.status(404).json({ error: "User not found." });
      }

      res.status(200).json(userData); // Return profile data
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  //CRUD
  addProducts,
  getProducts,
  putProducts,
  deleteProducts,
  //Authentication
  registration,
  loginUser,
  logoutUser,
  getProfile,
};

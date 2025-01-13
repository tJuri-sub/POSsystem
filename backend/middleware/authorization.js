const User = require('../model/user');
const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;
        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ error: "Not authorized, no token" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined");
        }

        console.log("Token received:", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded token:", decoded);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            console.log("User not found");
            return res.status(401).json({ error: "Not authorized, user not found" });
        }

        console.log("Authorized user:", user.username);
        req.user = user;
        next();
    } catch (error) {
        console.error("Authorization error:", error.message);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        res.status(401).json({ error: "Not authorized, invalid token" });
    }
};


module.exports = {authorize};

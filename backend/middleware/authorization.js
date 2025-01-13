const User = require('../model/user');
const jwt = require('jsonwebtoken');

const authorize = async (req, res, next) => {
    const token = req.cookies?.jwt;

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token" });
    }

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in the environment variables");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user by ID and exclude password
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ error: "Not authorized, user not found" });
        }

        // Attach user to request object
        req.user = user;

        // Proceed to the next middleware
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ error: "Token expired" });
        }
        res.status(401).json({ error: "Not authorized, invalid token" });
    }
};

module.exports = {authorize};

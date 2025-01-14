const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.header("auth-token");
        if (!token) return res.status(403).send("Access denied.");
        const decoded = jwt.verify(token, process.env.TOKEN_SCERET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};
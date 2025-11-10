const jwt = require("jsonwebtoken");
const JWT_SECRET = "jigneshahire@21";

const loginmiddleware = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).json({ errors: "Token not found" });
    }
    try {
        const data=jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user=data.user;
        // console.log(req.user);
        next();
    } catch (error) {
        return res.status(401).json({ errors: "Token not found" });
    }

}
module.exports = loginmiddleware;
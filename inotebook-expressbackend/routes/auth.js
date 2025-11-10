const express = require("express");
const router = express.Router();
const User = require("../modeules/User");
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const JWT_SECRET = "jigneshahire@21";
const jwt = require('jsonwebtoken');
const middleware = require("../middleware/loginmiddleware");

//post user
router.post("/createUser", [
    body("name", 'Enter a valida name').isLength({ min: 3 }),
    body("email", 'Enter a valid email').isEmail(),
    body("password", 'Enter a valid password').isLength({ min: 5 })
], async (req, res) => {

    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let user1 = await User.findOne({ email: req.body.email });
        if (user1) {
            return res.status(400).json("User already exists")
        }

        const salt = await bcrypt.genSalt(10);
        const securedPass = await bcrypt.hash(req.body.password, salt);

        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success=true;
        // console.log(token);
        res.json({ success,token });
    } catch (error) {
        success=false;
        console.log(error);
        res.status(500).send(success,"Internal server error occured!!")
    }
})

// validate a user
router.post("/login", [
    body("email", 'Enter a valid email').isEmail(),
    body("password", 'Enter a valid password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let success=false;
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("plz enter valid credentials");
        }

        const compare = await bcrypt.compare(req.body.password, user.password);

        if (!compare) {
            return res.status(400).json("plz enter valid credentials");
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        // console.log(token);
        success=true;
        res.json({success, token });


    } catch (error) {
        // console.log(error);
        res.status(500).send("Internal server error occured!!")
    }

})

// get logined in user
router.post("/getUser", middleware, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    // const [email, password] = req.body;
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
        // console.log(user);


    } catch (error) {
        // console.log(error);
        res.status(500).send("Internal server error occured!!")
    }

})


module.exports = router;
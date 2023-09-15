import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, user.password)
    if (passOk){
        const token = jwt.sign({ id: user._id }, `${process.env.JWT_SECRET_KEY}`);
        delete user.password;
        res.status(200).json({ token, user });
        // jwt.sign({username, id: userDoc._id}, `${process.env.JWT_SECRET_KEY}`, {}, (err, token) => {
        //     if (err) throw err;
        //     res.cookie('token', token).json({
        //         id: userDoc._id,
        //         username,
        //     });
        // });
    } else {
        res.status(400).json('wrong credentials');
    }
});

export default router;
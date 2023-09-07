import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


const router = express.Router();

const salt = bcrypt.genSaltSync(10);

router.post('/post', async (req, res) => {
    const {username, password, firstName, lastName} = req.body;
    try {
        const userDoc = await User.create({
            username,
            password:bcrypt.hashSync(password, salt),
            firstName,
            lastName,
        });
        res.json(userDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e)
    }

});

export default router;
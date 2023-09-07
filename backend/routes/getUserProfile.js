import express from "express";
import jwt from "jsonwebtoken";
const secret = process.env.SECRET;
const router = express.Router();

router.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

export default router;
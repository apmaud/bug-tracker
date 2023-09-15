import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.get('/profile', (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

export default router;
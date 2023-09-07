import express from "express";
const router = express.Router();

router.post('/logout', (req, res) => {
    res.cookie('token', '').json('ok');
})

export default router;
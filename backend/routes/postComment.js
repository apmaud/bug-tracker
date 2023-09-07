import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

router.post("/post", async (req,res) => {
    try{
        // success result of 200 status to the front end
        // sending our kpis object that we grabbed from database and sending it to front end
        const comments = await Comment.find();
        res.status(200).json(comments)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
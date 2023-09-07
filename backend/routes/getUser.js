import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/get", async (req,res) => {
    try{
        // success result of 200 status to the front end
        // sending our kpis object that we grabbed from database and sending it to front end
        const users = await User.find();
        res.status(200).json(users)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
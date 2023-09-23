import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.get("/get/names", async (req,res) => {
    try{
        const { userIds } = req.body;
        const usersNameList = await Promise.all(userIds.map(async (id) => {
            const user = await User.findOne({_id: id})
            return `${user.firstName} ${user.lastName}`
        }
        ))
        console.log(usersNameList)
        res.json(usersNameList);
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
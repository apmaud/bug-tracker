import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/post", async (req,res) => {
    const {name, description, contributors} = req.body; 
    try {
        const contributorList = await Promise.all(contributors.map(async (name) => {
            const fullName = name.split(" ");
            const firstName = fullName[0];
            const lastName = fullName[1];
            const user = await User.findOne({firstName: firstName, lastName: lastName})
            return user._id
        }
        ))
        const projectDoc = await Project.create({
            name,
            description,
            contributors: contributorList,
            contributorNames: contributors,
        });
        console.log(projectDoc);
        res.json(projectDoc);
    } catch(e) {
        console.log(e);
        res.status(400).json(e)
    }
});

export default router;
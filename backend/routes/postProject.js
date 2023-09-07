import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.post("/post", async (req,res) => {
    try{
        // success result of 200 status to the front end
        // sending our kpis object that we grabbed from database and sending it to front end
        const projects = await Project.find();
        res.status(200).json(projects)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
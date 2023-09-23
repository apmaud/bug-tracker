import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/get", async (req,res) => {
    try{
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
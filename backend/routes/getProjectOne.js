import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/:id", async (req,res) => {
    const { id } = req.params
    try{
        const project = await Project.findOne({_id: id})
        res.status(200).json(project)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
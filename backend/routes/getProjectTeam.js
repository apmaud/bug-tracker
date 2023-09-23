import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/:id/team", async (req,res) => {
    const { id } = req.params
    try{
        const project = await Project.findOne({_id: id})
        const team = [];
        const teamIds = project.contributors
        const teamNames = project.contributorNames
        teamIds.forEach((id, i) => {
            team.push({
                "id": `${id}`, 
                "name": `${teamNames[i]}`,
            })
        })
        res.status(200).json(team)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
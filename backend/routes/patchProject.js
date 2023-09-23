import express from "express";
import Project from "../models/Project.js";
import User from "../models/User.js";

const router = express.Router();

router.patch("/:id/team/update", async (req,res) => {
    try{
        const { id } = req.params
        const { contributors } = req.body
        const project = await Project.findOne({_id: id})
        const currentContributors = project.contributors
        const newContributors = await Promise.all(contributors.map(async (name) => {
            const user = await User.findOne({fullName: name})
            return user._id
        }))
        const combined = currentContributors.concat(newContributors);
        const combinedNames = project.contributorNames.concat(contributors)
        const updatedProject = await Post.findByIdAndUpdate(
            id,
            { contributors: combined},
            { contributorNames: combinedNames}
        );
        res.status(200).json(updatedProject)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
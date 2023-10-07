import Project from "../models/Project.js";
import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const getProject = async (req, res) => {
    try{
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getRelevantProjects = async (req, res) => {
    const token = req.header("Authorization");
    const verified = jwt.verify(token, `${process.env.SECRET}`)
    try{
        const projects = await Project.find({contributors: verified.id})
        res.status(200).json(projects)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProjectOne = async (req, res) => {
    const { id } = req.params
    try{
        const project = await Project.findOne({_id: id})
        res.status(200).json(project)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getProjectTeam = async (req, res) => {
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
}

export const postProject = async (req, res) => {
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
}

export const patchProjectTeam = async (req, res) => {
    const { id } = req.params
    const { newContributors } = req.body
    try{
        const project = await Project.findOne({_id: id})
        const currentContributorIds = project.contributors
        const currentContributorNames = project.contributorNames
        const newContributorIds = await Promise.all(newContributors.map(async (name) => {
            const user = await User.findOne({fullName: name})
            return user._id
        }))
        const newContributorNames = newContributors;
        const combinedIds = currentContributorIds.concat(newContributorIds)
        const combinedNames = currentContributorNames.concat(newContributorNames)
        console.log(combinedIds)
        console.log(combinedNames)
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { contributors: combinedIds, contributorNames: combinedNames},
        );
        res.status(200).json(updatedProject)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const removeProjectTeam = async (req, res) => {
    const { id } = req.params
    const { parameters } = req.body
    try{
        const project = await Project.findOne({_id: id})
        const currentContributorIds = project.contributors
        const currentContributorNames = project.contributorNames
        const user = await User.findOne({_id: parameters.id})
        const removeContributorId = user._id
        const removeContributorName = parameters.name
        const newIds = currentContributorIds.filter((contributor) => contributor.toString() !== removeContributorId.toString())
        const newNames = currentContributorNames.filter((contributor) => contributor !== removeContributorName)
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { contributors: newIds, contributorNames: newNames},
        );
        res.status(200).json(updatedProject)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}
export const removeProject = async (req, res) => {
    const { parameters } = req.body
    try{
        const projectId = parameters._id
        const ticketIds = parameters.tickets

        await Promise.all(ticketIds.map(async (id) => {
            const ticket = await Ticket.findById(id)
            const comments = ticket.comments
            await Promise.all(comments.map(async (comment) => {
                const commentId = comment.toString()
                await Comment.findByIdAndDelete(commentId)
            }))
        }))

        ticketIds.forEach(async (id) => {
            await Ticket.findOneAndDelete({_id: id})
        })

        await Project.findByIdAndDelete(projectId)
        res.status(200).json()
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

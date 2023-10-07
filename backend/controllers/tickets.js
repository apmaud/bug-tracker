import Project from "../models/Project.js";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import Comment from "../models/Comment.js";
import jwt from "jsonwebtoken";

export const getTickets = async (req, res) => {
    const { id } = req.params
    let token = req.header("Authorization");
    const verifyAssigned = (array) => {
        if (array.includes(verified.id)) {
            return true
        } else {
            return false
        }
    }
    const verified = jwt.verify(token, `${process.env.SECRET}`)
    try{
        const project = await Project.findOne({_id: id})
        const ticketIds = project.tickets
        const tickets = [];
        await Promise.all(ticketIds.map(async (ticketId) => {
            const ticket = await Ticket.findOne({_id: ticketId})
            const assigned = ticket.assigned.map(String)
            if (verifyAssigned(assigned)) {
                tickets.push(ticket);
            }
        }));
        res.status(200).json(tickets)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}


export const getAllTickets = async (req, res) => {
    let token = req.header("Authorization");
    const verified = jwt.verify(token, `${process.env.SECRET}`)
    try{
        const tickets = await Ticket.find({ assigned: verified.id })
        res.status(200).json(tickets)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const postTicket = async (req, res) => {
    const { id } = req.params
    const {title, description, contributors, status, priority, type, timeEst, token, authorName} = req.body;
    try{
        // const project = await Project.findOne({_id: id})
        const contributorIds = await Promise.all(contributors.map(async (name) => {
            const user = await User.findOne({fullName: name})
            return user._id
        }))
        const verified = jwt.verify(token, `${process.env.SECRET}`)
        const ticketDoc = await Ticket.create({
            title: title,
            project: id,
            description: description,
            author: verified.id,
            assigned: contributorIds,
            assignedNames: contributors,
            status: status,
            priority: priority,
            type: type,
            time: timeEst,
            authorName: authorName,
        })
        .then(async result => {
            await Project.findByIdAndUpdate(
                id,
                {$push: {"tickets": result._id}}
            )
        });
        res.status(200).json(contributorIds)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const removeTicket = async (req, res) => {
    const { id } = req.params
    const { parameters } = req.body
    try{
        const removeTicketId = parameters._id
        const commentIds = parameters.comments

        const project = await Project.findOne({_id: id})
        const currentTickets = project.tickets
        const newTickets = currentTickets.filter((ticket) => ticket.toString() !== removeTicketId.toString())
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            { tickets: newTickets},
        );

        commentIds.forEach(async (id) => {
            await Comment.findOneAndDelete({_id: id})
        })

        await Ticket.findOneAndDelete({_id: removeTicketId})
        res.status(200).json(updatedProject)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const getComments = async (req, res) => {
    const { id } = req.params
    try {
        const ticket = await Ticket.findOne({_id: id})
        const commentIds = ticket.comments
        const comments = await Promise.all(commentIds.map(async (id) => {
            const comment = await Comment.findOne({_id: id})
            return comment
        }))
        res.status(200).json(comments)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const postComment = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    const token = req.header("Authorization");
    
    try {
        const verified = jwt.verify(token, `${process.env.SECRET}`)
        const userDoc = await User.findOne({_id: verified.id})
        const author = userDoc.fullName
        const commentDoc = await Comment.create({
            author: author,
            comment: comment,
            ticket: id,
        })
        .then(async result => {
            await Ticket.findByIdAndUpdate(
                id,
                {$push: {"comments": result._id}}
            )
        });
        res.status(200).json()
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}

export const patchTicket = async (req, res) => {
    const {ticketId, title, description, contributors, status, priority, type, timeEst} = req.body;
    try{
        // const project = await Project.findOne({_id: id})
        const contributorIds = await Promise.all(contributors.map(async (name) => {
            const user = await User.findOne({fullName: name})
            return user._id
        }))
        await Ticket.findByIdAndUpdate(ticketId, 
            {
                title: title,
                description: description,
                assigned: contributorIds,
                assignedNames: contributors,
                status: status,
                priority: priority,
                type: type,
                time: timeEst,
            })
        res.status(200).json()
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
}
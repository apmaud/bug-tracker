import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

router.get("/tickets", async (req,res) => {
    try{
        // success result of 200 status to the front end
        // sending our kpis object that we grabbed from database and sending it to front end
        const tickets = await Ticket.find();
        res.status(200).json(tickets)
    } catch(error) {
        res.status(404).json({ message: error.message });
    }
});

export default router;
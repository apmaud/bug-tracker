import express from "express";
import { getTickets, postTicket, getComments, postComment, getAllTickets } from "../controllers/tickets.js";
const router = express.Router();

// READ

router.get("/:id/get", getTickets)
router.get("/:id/comments/", getComments)
router.get("/get", getAllTickets)
// UPDATE


// CREATE

router.post("/:id/post", postTicket)
router.post("/:id/comments/post", postComment)
export default router;
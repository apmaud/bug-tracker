import express from "express";
import { getProject, getProjectOne, getProjectTeam, patchProjectTeam, postProject, } from "../controllers/projects.js";
const router = express.Router();

// READ

router.get("/get", getProject)
router.get("/:id", getProjectOne)
router.get("/:id/team", getProjectTeam)

// UPDATE

router.patch("/:id/team/update", patchProjectTeam)

// CREATE

router.post("/post", postProject)


export default router;
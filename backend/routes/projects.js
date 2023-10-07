import express from "express";
import { getProject, getProjectOne, getProjectTeam, patchProjectTeam, postProject, getRelevantProjects, removeProjectTeam, removeProject} from "../controllers/projects.js";
const router = express.Router();

// READ

router.get("/get", getProject)
router.get("/get/relevant", getRelevantProjects)
router.get("/:id", getProjectOne)
router.get("/:id/team", getProjectTeam)

// UPDATE

router.patch("/:id/team/update", patchProjectTeam)
router.patch("/:id/team/remove", removeProjectTeam)
router.patch("/remove", removeProject)

// CREATE

router.post("/post", postProject)


export default router;
import express from "express";
import { getUser, getUserProfile, getUserIdOne, getUsersNames, postUser, postUserLogin, postUserLogout } from "../controllers/users.js";
const router = express.Router();

// READ

router.get("/get", getUser)
router.get("/:id", getUserProfile)
router.get("/:id/team", getUsersNames)
router.get("/get/id/one", getUserIdOne)

// UPDATE


// CREATE

router.post("/post", postUser)
router.post("/login", postUserLogin)
router.post("/logout", postUserLogout)

export default router;
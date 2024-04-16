import express from "express";
import { sendFile, getFiles } from "../controllers/file.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
const router = express.Router();

router.post("/send/:id", authenticateJWT, sendFile);
router.get("/:id", authenticateJWT, getFiles);
export default router;

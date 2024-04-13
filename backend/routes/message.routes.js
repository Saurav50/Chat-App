import express from "express";
import { sendMessage, getMessage } from "../controllers/message.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
const router = express.Router();

router.post("/send/:id", authenticateJWT, sendMessage);
router.get("/:id", authenticateJWT, getMessage);
export default router;

import express from "express";
import { getContacts } from "../controllers/user.controller.js";
import authenticateJWT from "../middlewares/authenticateJWT.js";
const router = express.Router();
router.get("/", authenticateJWT, getContacts);
export default router;

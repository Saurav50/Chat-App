import express from "express";
import { uploadFile, getFileUrl } from "../s3/s3.js";
const router = express.Router();

router.post("/putUrl", uploadFile);
router.post("/getUrl", getFileUrl);

export default router;

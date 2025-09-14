// routes/contactRoutes.js
import express from "express";
import { createContact } from "../controllers/contactController.js";

const router = express.Router();

// POST request for contact form submission
router.post("/", createContact);

export default router;

import express from "express";
import { getAllNotes, createNote, deleteNote, updateNote, getNoteById } from "../controllers/notesControllers.js";

const router = express.Router();

//get
router.get("/", getAllNotes);
// get a specific note
router.get("/:id", getNoteById);
// add notes 
router.post("/", createNote);
// update
router.put("/:id", updateNote);
// delete note
router.delete("/:id", deleteNote);



export default router;


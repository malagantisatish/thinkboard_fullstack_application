import Note from "../models/Note.js"

export const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // it will return the list of items
        // sort with -1 is using for getting newest first
        res.status(200).json(notes)


    } catch (error) {
        console.log("server error at getAllnotes")
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(400).json({ message: "Note not found" });

        }
        res.status(200).json(note)

    } catch (error) {
        console.log("Server error at getNoteById");
        res.status(500).json({ message: "Internal server error" })
    }
}


export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body
        const newNote = new Note({ title, content }) // it is from Note(model)
        const addedNote = await newNote.save();
        res.status(201).json(addedNote);
    } catch (error) {
        console.log("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedItem = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json({ message: "Note updated Successfully!" })



    } catch (error) {
        console.log("Error in updateNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }

}

export const deleteNote = async (req, res) => {
    try {
        const deleteItem = await Note.findByIdAndDelete(req.params.id);
        if (!deleteItem) {
            return res.status(404).json({ message: "Note not found" })
        }
        res.status(200).json({ message: "Note deleted Successfully!" })



    } catch (error) {
        console.log("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
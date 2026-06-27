import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes.", error);
    res.status(500).json({ message: "Error fetching notes." });
  }
}

export async function getOneNote(req, res) {
  try{
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found." }); 
    res.status(200).json(note); 
  } catch (error) {
    console.error("Error in getOneNote.", error);
    res.status(500).json({ message: "Error fetching note." });
  }
}

export async function createNote(req, res) {
  //res.status(201).json({ message: "Post created successfully." });

  try{
    //console.log("req.body:", req.body);           // 👈 add this
    //console.log("content-type:", req.headers['content-type']);  
    const{title, content} = req.body;
    const note = new Note({title, content});

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote.", error);
    res.status(500).json({ message: "Error creating note." });
  }
}

export async function updateNote(req, res){
  //res.status(200).json({ message: "Post updated successfully." });
  try {
    //const { id } = req.params;
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
    new: true });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.status(200).json({message: "Note updated successfully."});
    //res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote.", error);
    res.status(500).json({ message: "Error updating note." });
  }
}

export async function deleteNote(req, res){
  //res.status(200).json({ message: "Post deleted successfully." });
  try {
    //const { id } = req.params;
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json({message: "Note deleted successfully.", note});
  } catch (error) {
    console.error("Error in deleteNote.", error);
    res.status(500).json({ message: "Error deleting note." });
  }
}
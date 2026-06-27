// 1 - create a schema for the note
// 2 - create a model based off the schema
import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{timestamps: true});

const Note = mongoose.model("Note", noteSchema);

export default Note;
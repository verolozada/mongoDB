const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    noteTitle: String,
    noteBbody: String,
    time: {
        type: Date,
        default: Date.now()
    }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
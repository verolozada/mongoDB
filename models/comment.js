const mongoose = require("mongoose");

//Schema
const Schema = mongoose.Schema;

// Initialize
const CommentSchema = new Schema({
  //Title
  name: {
    type: String
  },
  // Body
  comment: {
    type: String
  },
  //Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Model
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Article model
module.exports = Comment;
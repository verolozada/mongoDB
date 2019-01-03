const mongoose = require("mongoose");

//reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    link: {
        type: String, 
        required: true
    },
    note: {
        type: Schema.Types.ObjectId,
        ref: "Note"
    }
});

//Create model 
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
const mongoose = require("mongoose");

// save reference to the Schema Constructor
const Schema = mongoose.Schema;

// instantiate new UserSchema object
const ArticleSchema = new Schema({
  // unique title
  headline: {
    type: String,
    default: "Headline Unavailable"
  },
  // article description
  description: {
    type: String,
    default: "Description Unavailable"
  },
  // link to article
  articleLink: {
    type: String,
    default: "Article URL Unavailable"
  },
  // optional image link
  imageLink: {
    type: String
  },
  // date added
  createdAt: {
    type: Date,
    default: Date.now
  },
  // date article was published
  publishTime: {
    type: String
  },
  // saved status
  saved: {
    type: Boolean,
    default: false
  },
  // relate comments to an article
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// Create model from schema above, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
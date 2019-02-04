// db models
const db = require("../models");

module.exports = app => {
  // POST request for adding comment
  app.post("/comment/:id", (req, res) => {
    db.Comment.create(req.body)
      .then(dbComment => {
        const articleId = { _id: req.params.id };
        return db.Article.findOneAndUpdate(
          articleId,
          { $push: { comment: dbComment._id } },
          { new: true }
        );
      })
      .then(dbArticle => {
        res.redirect('/saved');
      })
      .catch(err => {
        console.log(err);
        res.json(err);
      });
  });
};

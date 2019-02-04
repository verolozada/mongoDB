// db models
const db = require("../models");
// scraping tools
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = app => {
  // GET articles
  app.get("/", (req, res) => {
    // axios grabs the body of the html
    axios
      .get("https://www.reuters.com/news/technology")
      .then(response => {
   
        const $ = cheerio.load(response.data);

        //   grab all article tags with class of post-block
        $(".story-content").each(function(i, element) {
          // result object with scraped info
          const result = {
            headline: $(this)
              .find("h3")
              .text()
              .trim(),
            articleLink: $(this)
              .find("a")
              .attr("href"),
            description: $(this)
              .children("p")
              .text()
              .trim(),
            // imageLink: $(this)
            //   .find("img")
            //   .attr("src"),
            publishTime: $(this)
              .find("time.article-time")
              .text()
              .trim()
          };

          // Create new Articles using the `result` object
          db.Article.create(result)
            .then(dbArticle => {})
            .catch(err => {
              console.log(err);
            });
        });
      })
      .then(
        db.Article.find({})
          .limit(10)
          .sort({ createdAt: "desc" })
          .then(dbArticle => {
            res.render("article", { article: dbArticle });
            // console.log(dbArticle);
          })
      );
  });
  // PUT request to save article
  app.put("/saved/:id", (req, res) => {
    db.Article.where({ _id: req.params.id })
      .updateOne({ saved: true })
      .then(response => {
        res.json(response);
      });
  });

  // GET request to view saved articles
  app.get("/saved", (req, res) => {
    db.Article.find({ saved: true })
      .populate("comment")
      .sort({ createdAt: "desc" })
      .then(dbArticle => {
        console.log(dbArticle);
        res.render("saved-articles", { article: dbArticle });
      });
  });

  // DELETE request to remove saved article
  app.delete("/saved/:id", (req, res) => {
    db.Article.deleteOne({ _id: req.params.id }).then(response => {
      res.json(response);
    });
  });
};
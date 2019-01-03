const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

//require the models for the notes and articles to render
const db = require("./models");

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.render("index");
});

//create and array, then an object with the information and push thtat object to the array. 
app.get("/scrape", function (req, res) {
    axios.get("https://www.reuters.com/").then(function (response) {
        const $ = cheerio.load(response.data)
        const result = []
        $("h2.story-title").each(function (i, element) {
            const title = $(element).children().text();
            const link = $(element).find("a").attr("href");

            const dataToAdd = {
                title: title,
                link: link
            }

            result.push(dataToAdd);

            console.log(result);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
            res.send("Completed!");
        });
    });
});

app.get("/articles", function (req, res) {
    db.Article.find()
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err)
        });
});


app.listen(PORT, function () {
    console.log(`Listening to PORT: ${PORT}`);
});
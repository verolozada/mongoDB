const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

//require the models for the notes and articles to render
const db = require("./models");

const PORT = process.env.PORT || 3000;

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

app.listen(PORT, function () {
    console.log(`Listening to PORT: ${PORT}`);
});
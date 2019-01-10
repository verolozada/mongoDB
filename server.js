const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');

//require the models for the notes and articles to render
const db = require('./models');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

mongoose.connect(MONGODB_URI);

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

// Handlebars
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main'
    })
);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index');
});

// scraping the news website to grab information wanted. 
app.get('/scrape', (req, res) => {
    axios.get('http://www.echojs.com/').then(function (response) {

        const $ = cheerio.load(response.data);


        $('article h2').each(function (i, element) {

            const results = {
                title: $(element).children('a').text(),
                link: $(element).find('a').attr('href')
            };


            db.Article.create(results)
                .then(article => {
                    console.log(article)
                })
                .catch(err => {
                    console.log(`Error: ${err}`)
                })
        })
        res.redirect("/articles")
    });
});

//getting the articles scraped
app.get('/articles', (req, res) => {
    db.Article.find({})
        .limit(5)
        .then(article => {
            res.render('articles', { article })
            // res.json(article);
        });
});


// finding an specific article by id
app.get('/articles/:id', (req, res) => {
    db.Article.findOne({
        _id: req.params.id
    }).populate('notes')
        .then(article => {
            res.render('notes', { article })
        });
});

app.post('articles/:id', (req, res) => {
    db.Note.create({
        noteTitle: req.body.noteTitle,
        noteBody: req.body.noteBody
    })
        .then(note => {
            db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { note: note._id } }) //created an array for multiple notes, therefore the correct command is push instead of set.
                .then((() => { res.redirect(`/articles/${req.body.id}`) })
                    .catch(err => { console.log(`Error: ${err}`) }));
        });
});

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});


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

//create and array, then an object with the information and push thtat object to the array. 
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
        console.log('done!')
    });
});

//mLab on my computer
app.get('/articles', (req, res) => {
    db.Article.find({})
        .limit(5)
        .then(article => {
            res.render('index', { article });
        });
});

app.listen(PORT, () => {
    console.log(`Listening to PORT: ${PORT}`);
});
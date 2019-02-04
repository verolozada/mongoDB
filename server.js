const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

// Set port 8080 default for Heroku deployment 
const PORT = process.env.PORT || 8080


// Set public as a static folder 
app.use(express.static("public"));

// use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

///Setting express handlebars 
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// mLab , connect mongoose to mongo 
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


require("./controllers/ArticleController")(app);
require("./controllers/CommentController")(app);


app.listen(PORT, function() {
    console.log(`App running on http://localhost:${PORT}`);
  });
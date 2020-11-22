// If in development,
if (process.env.NODE_ENV !== "production") {
    //require the development npm package, dotenv.
    //and load all environment variables stored inside, which includes our database connection url.
    //the .env file is ignored by github, so it's contents are kept secret from the public.
    require("dotenv").config();
}

var express = require('express');
var app = express();
var mongoose = require('mongoose');

//Connect to database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
    if (err) {
        console.log("mongoose error: ", err);
    }
});

//Allows us to render ejs files instead of html files.
//(ejs files are pretty much the same as html files. The only difference is that they are inclusive of javascript.)
app.set("view-engine", "ejs");

//Tells our app to look inside the public directory for files, like our images.
app.use(express.static(__dirname + '/public'));

//ROUTES

//root route
app.get('/', (req, res) => {
    res.render("home.ejs");
})

//contact route
app.get('/contact', (req, res) => {
    res.render("contact.ejs");
})

//about route
app.get('/about', (req, res) => {
    res.render("about.ejs");
})

app.get('/mood/:userMood', (req, res) => {
    var mood = req.params.userMood;
    res.render("healing/index.ejs", { mood: mood });
})

app.get('/healing/:healing_method/:userMood', (req, res) => {
    var mood = req.params.userMood;
    var healing_method = req.params.healing_method;
    switch (healing_method) {
        case "music":
            res.render('healing/music.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "journal":
            res.render('journal/index.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "video":
            res.render('healing/video.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "help":
            res.render('healing/help.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "workout":
            res.render('healing/workout.ejs', { mood: mood, healing_method: healing_method });
            break;
        case "funny":
            res.render('healing/funny.ejs', { mood: mood, healing_method: healing_method });
            break;
        default:
            console.log("unrecognized healing method: " + healing_method);
            res.render('home.ejs');
    }
})

app.get('/journal/new', (req, res) => {
    res.render('journal/new.ejs');
})

//Server starts here with a port of 3000
app.listen(3000);
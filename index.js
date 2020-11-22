var express = require('express');
var app = express();

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
    res.render("healing.ejs", { mood: mood });
})

app.get('/healing/:healing_method/:userMood', (req, res) => {
    var mood = req.params.userMood;
    var healing_method = req.params.healing_method;
    switch (healing_method) {
        case "music":
            res.render('music.ejs', { mood: mood });
            break;
        case "journal":
            res.render('journal.ejs');
            break;
        case "video":
            res.render('video.ejs', { mood: mood });
            break;
        case "help":
            res.render('help.ejs', { mood: mood });
            break;
        case "workout":
            res.render('workout.ejs');
            break;
        case "funny":
            res.render('funny.ejs');
            break;
        default:
            console.log("unrecognized healing method: " + healing_method);
            res.render('home.ejs');
    }
})

app.get('/journal/new', (req, res) => {
    res.render('new_journal.ejs');
})

//Server starts here with a port of 3000
app.listen(3000);
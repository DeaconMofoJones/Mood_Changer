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
    switch (mood) {
        case "anxious":
            res.render('anxious.ejs', { mood: mood });
            break;
        case "sad":
            res.render('sad.ejs', { mood: mood });
            break;
        case "angry":
            res.render('angry.ejs', { mood: mood });
            break;
        case "lonely":
            res.render('lonely.ejs', { mood: mood });
            break;
        default:
            console.log("error: mood not recognized (" + userMood + ")");
            res.render('home.ejs')
    }
})

//Server starts here with a port of 3000
app.listen(3000);
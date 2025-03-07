"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const controllers = require('./word-controllers');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static('./public'));

app.get('/', controllers.gamePage);
app.post('/login', controllers.login);
app.post('/guess', controllers.guessWord);
app.post('/new-game', controllers.newGame);
app.post('/logout', controllers.logout);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});

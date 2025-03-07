"use strict";

const words = require('./words');
const views = require('./word-views');
const playModel = require('./word_models/play-models');
const sessionModel = require('./word_models/sessions-models');

const controllers = {};

controllers.getUsername = function (req, res) {
    const sessionId = req.cookies.sessionId;
    const session = sessionModel.getSession(sessionId);

    return session ? session.username : null;
};

controllers.login = function (req, res) {
    const username = req.body.username.trim();

    if (!username) {
        return res.status(400).send(views.errorPage("Username required", "/"));
    }

    if (username === "dog") {
        return res.status(403).send(views.errorPage("Username not permitted", "/"));
    }

    const allowedUsernameRegex = /^[a-zA-Z0-9]+$/;
    if (!allowedUsernameRegex.test(username)) {
        return res.status(400).send(views.errorPage("Username must contain only letters and numbers", "/"));
    }

    let player = playModel.getPlayer(username);
    if (!player) {
        player = playModel.createPlayer(username); // 确保玩家对象创建
    }

    let game = player.getGame();
    if (!game) {
        game = new Game(controllers.getRandomWord()); // 选择一个随机单词
        player.setGame(game);
        console.log(`Player: ${username}. Secret word: ${game.secretWord}`); // ✅ 登录时打印 Secret Word
    }

    const sessionId = sessionModel.createSession(username);
    res.cookie("sessionId", sessionId, { httpOnly: true });

    res.redirect('/');
};

controllers.gamePage = function (req, res) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId || !sessionModel.getSession(sessionId)) {
        return res.send(views.loginPage()); 
    }

    const username = controllers.getUsername(req, res);
    if (!username || !playModel.getPlayer(username)) { 
        return res.send(views.loginPage());
    }

    const player = playModel.getPlayer(username);
    let game = player.getGame();

    // 这里确保 game 为空时才创建新游戏
    if (!game || !game.secretWord) {  
        game = new Game(controllers.getRandomWord()); // 创建新游戏
        player.setGame(game);
        console.log(`Player: ${username}. Secret word: ${game.secretWord}`); // ✅ 确保这里打印
    }

    res.send(views.userGamePage(username, game, words, "", player.getHistory()));
};

controllers.guessWord = function (req, res) {
    const username = controllers.getUsername(req, res);
    if (!username) {
        return res.redirect('/');
    }

    const player = playModel.getPlayer(username);
    const game = player.getGame(); 

    if (!game) {
        return res.redirect('/');
    }

    const newWord = req.body.word.trim().toLowerCase();
    let errorMessage = "";

    if (!controllers.isValidGuess(newWord)) {
        errorMessage = `|${newWord}| is not in the possible words list, please try again.`;
    } else if (game.getGuessList().some(g => g.word === newWord)) { 
        errorMessage = `You have already guessed |${newWord}|, please try again.`;  
    }

    if (errorMessage) {
        return res.send(views.userGamePage(username, game, words, errorMessage, player.getHistory()));
    }

    const matchCount = controllers.calculateMatch(game.secretWord, newWord);
    game.addGuess(newWord, matchCount);

    res.redirect('/'); 
};

controllers.calculateMatch = function (secretWord, guess) {
    const wordUpper = secretWord.toUpperCase();
    const guessUpper = guess.toUpperCase();
    const letterCounts = {};

    for (const letter of wordUpper) {
        letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    let match = 0;
    for (const letter of guessUpper) {
        if (letterCounts[letter] > 0) {
            match++;
            letterCounts[letter]--;
        }
    }
    return match;
};

controllers.isValidGuess = function (word) {
    return words.includes(word);
};

controllers.newGame = function (req, res) {
    const username = controllers.getUsername(req, res);
    if (!username) {
        return res.send(views.loginPage());
    }

    const player = playModel.getPlayer(username);
    player.startNewGame();

    console.log(`Player: ${username}. Secret word: ${player.getGame().secretWord}`);
    res.redirect('/');
};

controllers.logout = function (req, res) {
    res.clearCookie("sessionId");

    const sessionId = req.cookies.sessionId;
    if (sessionId) {
        sessionModel.deleteSession(sessionId); 
    }

    res.clearCookie("sessionId");
    res.redirect('/');
};

module.exports = controllers;

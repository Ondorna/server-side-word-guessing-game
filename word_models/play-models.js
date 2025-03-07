"use strict";

const words = require('../words');
const historyModel = require('./history-models');

class Game {
    constructor(secretWord) {
        this.secretWord = secretWord.toLowerCase(); 
        this.guesses = [];
    }

    addGuess(word, matchCount) {
        this.guesses.push({ word: word.toLowerCase(), matchCount }); 
    }

    getGuessList() {
        return this.guesses;
    }

    getGuessTimes() {
        return this.guesses.length;
    }

    isWin() {
        return this.guesses.some(g => g.word === this.secretWord); 
    }
}

class Player {
    constructor(username) {
        this.username = username;
        this.currentGame = null;
        this.historyGames = [];
    }

    startNewGame() {
        if (this.currentGame) {
            this.historyGames.push(this.currentGame); 
            historyModel.addHistory(this.username, this.currentGame); 
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        const secretWord = words[randomIndex];

        this.currentGame = new Game(secretWord);
    }

    getGame() {
        if (!this.currentGame) {
            this.startNewGame(); 
            console.log(`Player: ${this.username}, Secret Word: ${this.currentGame.secretWord}`);
        }
        return this.currentGame;
    }

    getHistory() {
        return this.historyGames;
    }
}

const players = {}; 

function getPlayer(username) {
    if (!players[username]) {
        players[username] = new Player(username);
    }
    return players[username];
}

module.exports = { getPlayer };

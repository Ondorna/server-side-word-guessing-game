"use strict";

const pageView = {
    loginPage: function () {
        return `
            <!doctype html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Login</title>
                    <link rel="stylesheet" href="/login.css"/>
                </head>
                <body>
                    <h1>Login to start game!</h1>
                    <div class="login">
                        <img class="cat" src="/images/login-cat.jpg" alt="Cute Cat"/>
                        <form action="/login" method="POST">
                            <label for="username">Username:</label>
                            <input type="text" name="username" id="username"/>
                            <button type="submit">Let's go!</button>
                        </form>
                    </div>
                </body>
            </html>
        `;
    },

    userGamePage: function (username, game, possibleList, errorMessage = "", history) {
        return `
            <!DOCTYPE html>
            <html lang="zh">
                <head>
                    <meta charset="UTF-8">
                    <title>Game Page</title>
                    <link rel="stylesheet" href="/game.css"/>
                </head>
                <body>
                    <form action="/logout" method="POST" class="logout-form">
                        <button class="logout-button">Logout</button>
                    </form>
            
                    <div class="game-status">
                        <!-- 左侧部分 -->
                        <section class="left-panel">
                            <h1>Have fun, ${username}!</h1>
                            <img class="cat" src="/images/word-cat.jpg" alt="Cute Cat"/>
            
                            <article class="history">
                                <h2>Game History</h2>
                                <p class="history-summary">You have played ${history.length} games in total:</p>
                                ${history.length > 0 ? history.map(game => `
                                    <p class="history-item">SecretWord: <b>${game.secretWord.toUpperCase()}</b> |
                                    Attempts: <b>${game.getGuessTimes()}</b> | 
                                    ${game.isWin() ? "<span class='win'>Win</span>" : "<span class='lose'>Lose</span>"}
                                    </p>
                                `).join("") : `<p class="no-history">No games played yet!</p>`}
                            </article>
                        </section>
            
                        <!-- 右侧部分 -->
                        <section class="right-panel">
                            <header class="game-header">
                                <h3>Let's play, Good luck!</h3>
                                <form action="/new-game" method="POST">
                                    <button type="submit" class="new-game-button">Start New Game</button>
                                </form>
                            </header>
            
                            <article class="guess-info-box">
                                <p class="current-guess-title">Current guess-record:</p>
                                <p class="current-guess-times">Guessed ${game.getGuessTimes()} times total.</p>
                                <ul>
                                    ${game.getGuessList().map(g => `<li>${g.word} - Matches: ${g.matchCount}</li>`).join("")}
                                </ul>
                            </article>
            
                            ${errorMessage ? `<p class="error">${errorMessage}</p>` : ""}
                            
                            ${game.isWin() ? `
                                <p class="win-message">Congrats! You are the Winner!</p>
                            ` : `
                            <form action="/guess" method="POST" class="guess-form">
                                <label for="word">Guess here:</label>
                                <input type="text" name="word" required class="input-box"/>
                                <button type="submit" class="go-button">GO!</button>
                            </form>
                            `}
            
                            <aside class="game-hint-box">
                                <p class="game-rules">Hint: the secret word is in the following words!</p>
                                <p class="possible-list"> <span class="possible-word">${possibleList.join(", ")}</span></p>
                            </aside>
                        </section>
                    </div>
                </body>
            </html>
        `;
    },

    errorPage: function (errorMessage, returnPage) {
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Error</title>
                    <link rel="stylesheet" href="/login-error.css"/>
                </head>
                <body>
                    <div class="error-page">
                        <img class="cat" src="/images/error-cat.jpg" alt="Cute Cat"/>
                        <h1>Error</h1>
                        <p>${errorMessage}</p>
                        <a href="${returnPage}" class="return-link">Return to login</a>
                    </div>
                </body>
            </html>
        `;
    }
};

module.exports = pageView;

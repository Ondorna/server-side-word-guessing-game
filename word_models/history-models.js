"use strict";

const historyRecord = {}; 

function getHistory(username) {
    return historyRecord[username] || [];
}

function addHistory(username, game) {
    if (!historyRecord[username]) {
        historyRecord[username] = [];
    }

    historyRecord[username].push(game);
    historyRecord[username].sort((a, b) => b.timestamp - a.timestamp);
}

const historyModel = {
    historyRecord,
    getHistory,
    addHistory,
};

module.exports = historyModel;

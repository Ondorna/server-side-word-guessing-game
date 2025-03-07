"use strict";

const sessions = {}; 

function createSession(username) {
    const sessionId = require("crypto").randomUUID();
    sessions[sessionId] = { username };
    return sessionId;
}

function getSession(sessionId) {
    return sessions[sessionId] || null;
}

function deleteSession(sessionId) {
    delete sessions[sessionId];
}

const sessionModel = {
    sessions,
    createSession,
    getSession,
    deleteSession,
};

module.exports = sessionModel;

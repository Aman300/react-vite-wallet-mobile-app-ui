const express = require("express");
const { createGame, gameOpen, gameDelete } = require("../../controllers/game/ludo.game");
const game = express.Router();

game.post("/game/:id", createGame);
game.get("/game", gameOpen);
game.delete("/game/:id", gameDelete);

module.exports = game;
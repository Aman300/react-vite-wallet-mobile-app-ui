const express = require("express");
const { userLogin, clearDatabase } = require("../../controllers/auth/auth.user");
const { loginValidation } = require("../../middleware/auth.validation");
const auth = express.Router();

auth.post("/login", loginValidation, userLogin);
auth.get("/db-clear", clearDatabase);

module.exports = auth;
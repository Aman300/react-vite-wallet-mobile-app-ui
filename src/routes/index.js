const express = require("express");
const auth = require("./auth/auth");
const game = require("./game/game");
const router = express.Router();

router.use("/auth", auth);
router.use("/game", game);


router.all("*", async (req, res) => {
    let time = new Date();
    let Data = `${time}`;
    res.status(404).json({ status: false, message: "Page not found", Data });
  });
  

module.exports = router;